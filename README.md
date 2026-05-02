# 💰 Loan System

A fullstack loan management system where users can apply for loans and admins can review, approve, or reject them.

---

## 🚀 Features

- 🔐 User authentication (Register & Login)
- 🧑‍💼 Role-based access (Admin & User)
- 📝 Loan application system
- ✅ Admin approval/rejection workflow
- 📊 Dashboard with loan statistics
- 🧪 Backend and frontend testing implemented

---

## 🧰 Tech Stack

### Frontend
- React
- CSS

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (or your configured database)

### Testing
- Jest (Backend)
- Vitest + React Testing Library (Frontend)

---

## 📦 Project Structure


LoanSystem/
├── loan-system-frontend/
├── loan-system-backend/


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
git clone https://github.com/OtakuCoder024/LoanSystem.git
cd LoanSystem

### 2. Backend Setup
cd loan-system-backend
npm install
npx prisma generate
npx prisma migrate dev
npx ts-node-dev src/app.ts 

### 3. Frontend Setup
cd loan-system-frontend
npm install
npm run dev

## 🧪 Testing

Backend
cd loan-system-backend
npx jest

Frontend
cd loan-system-frontend
npm test


👤 Author

Lance Ancheta
GitHub: https://github.com/OtakuCoder024
