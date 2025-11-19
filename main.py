from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
import datetime
from fastapi.middleware.cors import CORSMiddleware

# --- NEW IMPORTS FOR SERVING HTML ---
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Database setup
script_dir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(script_dir, 'bank.db')}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    balance = Column(Float, default=1000.0)
    is_admin = Column(Boolean, default=False)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String)
    receiver = Column(String)
    amount = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)

# Pydantic Models
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TransferRequest(BaseModel):
    receiver_username: str
    amount: float

class ChangePasswordRequest(BaseModel):
    username: str
    old_password: str
    new_password: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Startup Event
@app.on_event("startup")
def create_admin_user():
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.username == "admin").first()
        if not admin:
            admin_user = User(
                username="admin",
                password="admin123",
                balance=1000000,
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
    finally:
        db.close()

# --- API ENDPOINTS ---

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username, User.password == user.password).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"username": db_user.username, "is_admin": db_user.is_admin, "balance": db_user.balance}

@app.post("/transfer")
def transfer(req: TransferRequest, current_username: str, db: Session = Depends(get_db)):
    sender = db.query(User).filter(User.username == current_username).first()
    receiver = db.query(User).filter(User.username == req.receiver_username).first()
    if not sender: raise HTTPException(status_code=404, detail="Sender not found")
    if not receiver: raise HTTPException(status_code=404, detail="Receiver not found")
    if sender.balance < req.amount: raise HTTPException(status_code=400, detail="Insufficient balance")

    sender.balance -= req.amount
    receiver.balance += req.amount
    transaction = Transaction(sender=sender.username, receiver=receiver.username, amount=req.amount)
    db.add(transaction)
    db.commit()
    return {"message": "Transfer successful"}

@app.get("/history/{username}")
def get_history(username: str, db: Session = Depends(get_db)):
    transactions = db.query(Transaction).filter((Transaction.sender == username) | (Transaction.receiver == username)).all()
    return transactions

@app.get("/admin/stats")
def get_admin_stats(current_username: str, db: Session = Depends(get_db)):
    admin = db.query(User).filter(User.username == current_username, User.is_admin == True).first()
    if not admin: raise HTTPException(status_code=403, detail="Admin access required")
    users = db.query(User).all()
    transactions = db.query(Transaction).all()
    total_money = sum(u.balance for u in users)
    return {
        "all_customers_and_balances": [{"username": u.username, "balance": u.balance} for u in users],
        "total_money_in_bank": total_money,
        "all_transactions": transactions
    }

@app.delete("/admin/reset")
def reset_system(current_username: str, db: Session = Depends(get_db)):
    admin = db.query(User).filter(User.username == current_username, User.is_admin == True).first()
    if not admin: raise HTTPException(status_code=403, detail="Admin access required")
    db.query(Transaction).delete()
    db.query(User).filter(User.is_admin == False).delete()
    admin.balance = 1000000
    db.add(admin)
    db.commit()
    return {"message": "System Reset Successful. All data cleared."}

# --- STATIC FILES SETUP (THIS IS THE FIX) ---
# Mount the current directory to serve index.html
app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/")
async def read_index():
    return FileResponse('index.html')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
