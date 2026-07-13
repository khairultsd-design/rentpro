This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 🏠 RentPro v1.0

> A modern Property Rental Management System built with Next.js, Prisma, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

---

# 📖 Overview

RentPro is a web-based rental property management system designed to help landlords and property managers manage:

- Properties
- Rooms
- Tenants
- Tenancies
- Monthly Rental Invoices
- Payments
- Expenses
- Financial Reports
- User Management

The application automates monthly invoice generation and provides a centralized dashboard for monitoring business performance.

---

# ✨ Features

## Dashboard

- Business summary cards
- Monthly income
- Outstanding invoices
- Overdue invoices
- Recent payments
- Recent expenses
- Recent activity
- Dashboard analytics chart

---

## Property Management

- Add Property
- Edit Property
- Delete Property
- Property Details

---

## Room Management

- Add Room
- Edit Room
- Delete Room
- Room Status

- Available
- Occupied
- Maintenance

---

## Tenant Management

- Add Tenant
- Edit Tenant
- Delete Tenant

Tenant Status

- Pending
- Active
- Checked Out

---

## Tenancy

- Create Tenancy
- Auto Room Occupancy
- Auto Tenant Activation
- Auto First Invoice Creation

---

## Invoice

- Automatic Invoice Number
- Monthly Invoice Generation
- Invoice Status

- Pending
- Partial
- Paid
- Overdue

---

## Payment

- Record Payment
- Partial Payment
- Full Payment
- Receipt Printing

---

## Expense

- Add Expense
- Categories
- Monthly Tracking

---

## Reports

Financial Report including:

- Income
- Expenses
- Outstanding
- Active Rooms
- Occupancy Summary

Export PDF supported.

---

## Company Settings

Manage:

- Company Name
- Address
- Phone
- Email

---

## User Management

- Add User
- Roles
- Login Protection

---

# 🛠 Technology Stack

Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

Backend

- Next.js Server Actions
- Prisma ORM

Database

- SQLite (Development)

Charts

- Recharts

PDF

- jsPDF
- jspdf-autotable

---

# 📂 Project Structure

```
src/
 ├── app/
 ├── components/
 ├── features/
 ├── lib/
 ├── prisma/
 └── types/
```

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/rentpro.git
```

Install packages

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migration

```bash
npx prisma migrate dev
```

Start development server

```bash
npm run dev
```

---

# 🔧 Environment Variables

Create `.env`

```env
DATABASE_URL="file:./dev.db"
```

---

# 📸 Screenshots

Coming Soon

- Dashboard
- Property
- Room
- Tenant
- Invoice
- Payment
- Reports

---

# 📈 Future Improvements

- PostgreSQL Support
- Email Invoice
- WhatsApp Reminder
- Multi Company
- Mobile App
- Online Payment Gateway
- Notification Center
- Audit Log

---

# 👨‍💻 Author

Developed by Khairul Azlan.

---

# 📄 License

MIT License

---

## ⭐ Version

Current Version

**v1.0.0**