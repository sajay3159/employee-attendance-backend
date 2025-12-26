# Employee Attendance System Backend

A backend system for managing employee attendance with punch-in / punch-out, role-based authentication, and admin analytics.

Features

JWT-based authentication (Admin / Employee)
Employee punch-in & punch-out (once per day)
Automatic punctuality calculation (early / on-time / late)
Admin attendance listing with filters
Admin dashboard analytics
Clean service-based architecture

Tech Stack

Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Day.js

Authentication

Login via /api/auth/login
JWT required for all protected routes
Role-based access:
employee → punch-in / punch-out
admin → attendance & analytics

Attendance Logic

One punch-in per employee per day
Punctuality based on business hours:
Early → before start time
On-time → within grace period
Late → after grace period
Total worked hours calculated on punch-out

Analytics (Admin)

Total employees
Present today
On-time count
Late count
Attendance rate (%)

⚙️ Setup & Run

1. Install dependencies
   npm install

2. Environment variables (.env)
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/attendance_system
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1d

3. Run server
   npm run dev

   API Testing

Use Postman with:

Authorization: Bearer <token>
