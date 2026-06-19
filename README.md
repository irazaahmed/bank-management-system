# 🏦 AR Bank Limited - Banking Management System

**AR Bank Limited** is a full-stack banking application that simulates core banking operations. It allows users to create accounts, manage their balance, transfer money securely, and view transaction history in real-time. It also includes a powerful **Admin Panel** for system management.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Tech-Next.js%20%7C%20Prisma%20%7C%20PostgreSQL-blue)

**🔗 Live Demo:** [bank-management-system-kappa-rose.vercel.app](https://bank-management-system-kappa-rose.vercel.app)

---

## 🚀 Features

### 👤 User Panel
- **Secure Authentication:** Signup and login with hashed passwords (bcrypt) and signed, httpOnly session cookies.
- **Dashboard:** Real-time view of current balance and welcome message.
- **Money Transfer:** Instantly transfer funds to other users (with validation).
- **Transaction History:** View a detailed log of sent and received money.
- **Change Password:** Update your password from the dashboard.

### 🛡️ Admin Panel (The "Boss" Mode)
- **User Management:** View a master list of all bank users and their balances.
- **System Stats:** See the total money circulating in the bank.
- **System Reset:** A "Danger Zone" feature to wipe all data and reset the bank to its initial state.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions, TypeScript)
- **Database:** PostgreSQL ([Neon](https://neon.tech)), via Prisma ORM
- **Styling:** Tailwind CSS
- **Auth:** bcryptjs password hashing + signed JWT session cookies (jose)
- **Validation:** Zod

---

## ⚙️ Installation & Setup

### 1. Install dependencies

```bash
npm install
```

(`prisma generate` runs automatically via `postinstall`.)

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set:

- `DATABASE_URL` — a Postgres connection string (e.g. from [Neon](https://neon.tech))
- `SESSION_SECRET` — a real random value (e.g. `openssl rand -base64 32`)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — credentials for the seeded admin account (pick your own; not committed to the repo)

### 3. Set up the database

```bash
npm run db:migrate
npm run db:seed
```

This creates the schema and seeds the admin account using the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in `.env`, with a starting
balance of Rs. 1,000,000.

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). New accounts get a welcome bonus of Rs. 1,000.

---

## 📂 Project Structure

```
app/
  actions/        Server Actions (auth, transfers, admin reset)
  login/, register/, dashboard/, admin/   Route pages
  ui/             Shared UI components
lib/
  prisma.ts       Prisma client (Neon serverless driver adapter)
  session.ts      JWT session encrypt/decrypt + cookie helpers
  dal.ts          Data access layer (session verification, current user)
  validation.ts   Zod schemas
proxy.ts          Route protection (redirects based on session)
prisma/
  schema.prisma   User & Transaction models
  seed.ts         Creates the admin account
```
