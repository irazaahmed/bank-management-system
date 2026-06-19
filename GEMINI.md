# Project: AR Bank Limited - Professional Banking System

## 1. Project Overview
A complete banking system where users can sign up, login, and transfer money.
**Special Role:** There is an "Admin" (Owner) who can view all user data and system wealth.

## 2. Tech Stack
- **Backend:** FastAPI (Python), SQLite.
- **Frontend:** HTML/CSS/JS (Single Page App).

## 3. Key Features & Logic

### A. User Management (Dynamic)
1.  **Sign Up (Self-Registration):**
    - Any visitor can create an account.
    - Input: Username, Password.
    - **Validation:** Username must be **Unique**. If 'ali' exists, reject new 'ali'.
    - **Case Sensitivity:** 'Ali' and 'ali' are treated as different (or handle as same based on preference, strictly stick to case-sensitive for now).
    - **Initial Balance:** New users get a Welcome Bonus of **1000 PKR**.

2.  **Authentication:**
    - Login with created Username & Password.
    - Password Reset option available for logged-in users.

### B. Money Transfer
- Users can transfer funds to **any existing username**.
- System must check if the receiver exists before transferring.
- Logic: Deduct from Sender -> Add to Receiver -> Log Transaction.

### C. The Admin Dashboard (Owner's View)
- **Admin User:** The username `admin` (password set via the `ADMIN_PASSWORD` environment variable) is special.
- When `admin` logs in:
    - Do NOT show transfer options.
    - **INSTEAD SHOW:** A "Master List" of all users and their current balances.
    - Show a list of ALL transactions happening in the bank.

## 4. Database Structure
1.  **User Model:**
    - `username` (Unique, Index)
    - `password` (String)
    - `balance` (Float)
    - `is_admin` (Boolean, default False) -> Set True only for the 'admin' user manually or via seed.
2.  **Transaction Model:**
    - `sender`, `receiver`, `amount`, `timestamp`.

## 5. API Endpoints (Backend)
- `POST /register`: Check duplicate username. Create new user.
- `POST /login`: Validate user. Return User Object (include `is_admin` flag).
- `POST /transfer`: Handle money logic.
- `GET /admin/stats`: **(New)** Returns list of all users + balances (Protected: Only for admin).
- `PUT /change-password`: Update password.

## 6. Frontend UI Requirements
1.  **Public Page:** Login & Signup Forms toggle.
2.  **User Dashboard:**
    - Greeting & Balance.
    - Transfer Money Form.
    - Personal Transaction History.
3.  **Admin Dashboard:**
    - Hidden for normal users.
    - Shows a Table: "All Customers & Balances".
    - Shows "Total Money in Bank".

## 7. Initialization
- On startup, create a Superuser automatically:
    - Username: from `ADMIN_USERNAME` env var (defaults to `admin`)
    - Password: from `ADMIN_PASSWORD` env var (required, not hardcoded)
    - Balance: 1,000,000