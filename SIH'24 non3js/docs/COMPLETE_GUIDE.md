# 🌾 FarmConnect - Complete Guide

**Version:** 1.0.0  
**Last Updated:** March 5, 2024  
**Architecture:** MERN Stack (MongoDB, Express.js, Vanilla JS, Node.js)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Database Structure](#database-structure)
4. [Installation & Setup](#installation--setup)
5. [How to Run](#how-to-run)
6. [How to Test](#how-to-test)
7. [API Endpoints](#api-endpoints)
8. [Frontend Pages](#frontend-pages)
9. [Features](#features)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

FarmConnect is a complete MERN stack application that connects farmers with companies for assured contract farming. It includes:

- ✅ User authentication with email verification
- ✅ Farmer profile management
- ✅ Contract creation with PDF generation
- ✅ Real-time analytics dashboard
- ✅ Email notifications
- ✅ Professional UI with glassmorphism design

---

## 💻 Technology Stack

### Backend
- **Node.js** (v14+) - Runtime environment
- **Express.js** (v4.18+) - Web framework
- **MongoDB** (v4.4+) - NoSQL database
- **Mongoose** (v7.6+) - MongoDB ODM
- **bcryptjs** (v2.4+) - Password hashing
- **jsonwebtoken** (v9.0+) - JWT authentication
- **nodemailer** (v6.9+) - Email service
- **express-validator** (v7.0+) - Input validation

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (Glassmorphism design)
- **Vanilla JavaScript** (ES6+) - Logic
- **jsPDF** (v2.4+) - PDF generation
- **Plotly.js** - Data visualization

### Database
- **MongoDB** - NoSQL database
- **Database Name:** ContractFarming
- **Collections:** 7 (admin, config, local, users, farmers, contracts, measurements)

---

## 🗄️ Database Structure

### Database: `ContractFarming`

#### Collection 1: `users`
Stores user accounts and authentication data.

```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (farmer/company/admin),
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpire: Date,
  createdAt: Date
}
```

#### Collection 2: `farmers`
Stores farmer profiles and information.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  name: String,
  company: String,
  location: String,
  age: Number,
  description: String,
  image: String,
  specialization: [String],
  experience: Number,
  isActive: Boolean,
  createdAt: Date
}
```

#### Collection 3: `contracts`
Stores farming contracts between companies and farmers.

```javascript
{
  _id: ObjectId,
  companyId: ObjectId (ref: users),
  farmerId: ObjectId (ref: farmers),
  companyName: String,
  farmerName: String,
  contractDate: Date,
  product: String,
  quantity: Number,
  pricePerUnit: Number,
  totalAmount: Number,
  email: String,
  status: String (pending/active/completed/cancelled),
  createdAt: Date
}
```

#### Collection 4: `measurements`
Stores production measurements for real-time analytics.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  contractId: ObjectId (ref: contracts),
  value: Number,
  unit: String,
  type: String (production/quality/yield/other),
  createdAt: Date
}
```

#### System Collections
- `admin` - System administration
- `config` - Application configuration
- `local` - Authentication credentials

---

## 🚀 Installation & Setup

### Prerequisites

Before starting, ensure you have:
- ✅ Node.js (v14 or higher)
- ✅ MongoDB (v4.4 or higher)
- ✅ Gmail account (for email verification)

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cd server
cp .env.example .env
```

2. Edit `server/.env` with your settings:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ContractFarming
JWT_SECRET=your_random_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=FarmConnect <noreply@farmconnect.com>

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Step 3: Gmail App Password Setup

1. Go to https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification if not already enabled
3. Generate an App Password for "Mail"
4. Copy the 16-character password
5. Paste it in `EMAIL_PASSWORD` in your `.env` file

### Step 4: Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Verify MongoDB is running:**
```bash
mongosh
# You should see MongoDB shell
# Type "exit" to close
```

---

## ▶️ How to Run

### Method 1: Manual Start (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

**Terminal 2 - Frontend:**
```bash
cd client
python -m http.server 3000
```

Or if you don't have Python:
```bash
npx http-server -p 3000
```

**Open Browser:**
```
http://localhost:3000
```

### Method 2: Production Start

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
Deploy to Vercel, Netlify, or any static hosting service.

---

## 🧪 How to Test

### Test 1: Populate Database with Sample Data

This creates sample users, farmers, contracts, and measurements.

```bash
cd server
node test-database.js
```

**Expected Output:**
```
✅ MongoDB Connected Successfully!
✅ Created User: testuser
✅ Created 3 Farmers
✅ Created 2 Contracts
✅ Created 7 Measurements

📊 DATABASE POPULATION COMPLETE!

Summary:
  • Users: 1
  • Farmers: 3
  • Contracts: 2
  • Measurements: 7

🔐 Test Login Credentials:
   Username: testuser
   Password: password123
```

### Test 2: Test API Operations

This verifies all MongoDB operations are working.

```bash
cd server
node test-api.js
```

**Expected Output:**
```
🧪 TESTING MONGODB API OPERATIONS

✅ Users: 1
✅ Farmers: 3
✅ Contracts: 2
✅ Measurements: 7

✅ ALL API TESTS COMPLETED SUCCESSFULLY!
```

### Test 3: View Data in MongoDB Compass

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Click "Refresh" button
4. Expand "ContractFarming" database
5. You should see:
   - users (1 document)
   - farmers (3 documents)
   - contracts (2 documents)
   - measurements (7 documents)

### Test 4: Test Web Application

1. Start backend and frontend (see "How to Run")
2. Open: http://localhost:3000
3. Click "Register" and create an account
4. Check your email for verification link
5. Click verification link
6. Login with your credentials
7. Test all features:
   - Browse farmers
   - Create contract
   - Add measurements
   - View analytics graph

### Test 5: Test with Sample Credentials

After running `test-database.js`, login with:
- **Username:** testuser
- **Password:** password123

You'll see:
- 3 farmers in the listings
- 2 contracts in your account
- 7 measurements on the analytics graph

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/verify-email/:token` | Verify email | No |
| POST | `/auth/resend-verification` | Resend verification email | No |

**Example - Register:**
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_farmer",
  "email": "john@example.com",
  "password": "password123",
  "role": "farmer"
}
```

**Example - Login:**
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_farmer",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "john_farmer",
    "email": "john@example.com",
    "role": "farmer",
    "isVerified": true
  }
}
```

### Farmer Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/farmers` | Get all farmers | No |
| GET | `/farmers/:id` | Get single farmer | No |
| POST | `/farmers` | Create farmer profile | Yes (Verified) |
| PUT | `/farmers/:id` | Update farmer profile | Yes (Verified) |

**Example - Get All Farmers:**
```javascript
GET /api/farmers

Response:
[
  {
    "_id": "...",
    "name": "John Smith",
    "company": "Green Fields Co.",
    "location": "California, USA",
    "age": 45,
    "specialization": ["Organic Farming", "Vegetables"],
    "experience": 20
  }
]
```

### Contract Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/contracts` | Get user's contracts | Yes (Verified) |
| GET | `/contracts/:id` | Get single contract | Yes (Verified) |
| POST | `/contracts` | Create contract | Yes (Verified) |
| PATCH | `/contracts/:id/status` | Update contract status | Yes (Verified) |

**Example - Create Contract:**
```javascript
POST /api/contracts
Authorization: Bearer <token>
Content-Type: application/json

{
  "companyName": "Green Fields Co.",
  "farmerName": "John Smith",
  "farmerId": "...",
  "contractDate": "2024-03-05",
  "product": "Organic Tomatoes",
  "quantity": 5000,
  "pricePerUnit": 3.50,
  "email": "contact@greenfields.com"
}
```

### Measurement Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/measurements` | Get user's measurements | Yes (Verified) |
| POST | `/measurements` | Add measurement | Yes (Verified) |
| GET | `/measurements/contract/:id` | Get measurements by contract | Yes (Verified) |

**Example - Add Measurement:**
```javascript
POST /api/measurements
Authorization: Bearer <token>
Content-Type: application/json

{
  "value": 150,
  "type": "production",
  "unit": "kg"
}
```

---

## 🎨 Frontend Pages

### 1. Home Page (`/`)
- Hero section with call-to-action
- Features showcase
- Navigation to other pages

### 2. Login Page (`/login`)
- Username and password fields
- Link to registration
- Error handling

### 3. Registration Page (`/register`)
- Username, email, password fields
- Role selection (farmer/company)
- Email verification notice

### 4. Email Verification Page (`/verify-email`)
- Verification status message
- Resend verification option

### 5. Farmers Page (`/farmers`)
- Grid of farmer cards
- Click to view details
- Real-time data from database

### 6. Farmer Details Page (`/farmer/:id`)
- Farmer profile information
- Specializations and experience
- Create contract button

### 7. Contract Creation Page (`/contract`)
- Contract form with all fields
- PDF generation button
- Email notification

### 8. Analytics Dashboard (`/analytics`)
- Measurement input form
- Real-time graph (Plotly.js)
- Historical data visualization

---

## ✨ Features

### 1. User Authentication
- ✅ Registration with email verification
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Role-based access (farmer/company/admin)
- ✅ Protected routes with middleware

### 2. Email Verification System
- ✅ Automated verification emails
- ✅ Professional HTML email templates
- ✅ 24-hour token expiration
- ✅ Resend verification option
- ✅ Required for protected features

### 3. Farmer Discovery
- ✅ Browse available farmers
- ✅ View detailed profiles
- ✅ Specializations and experience
- ✅ Direct contract creation

### 4. Contract Management
- ✅ Professional contract creation form
- ✅ PDF generation with branding
- ✅ Email notifications
- ✅ Database storage
- ✅ Status tracking

### 5. Real-Time Analytics
- ✅ Production measurement recording
- ✅ Real-time data from MongoDB (NO predefined data)
- ✅ Interactive Plotly.js charts
- ✅ Historical data visualization
- ✅ Multiple measurement types

### 6. Security Features
- ✅ Password hashing (bcrypt, 10 rounds)
- ✅ JWT authentication (7-day expiry)
- ✅ Email verification required
- ✅ Input validation (express-validator)
- ✅ CORS protection
- ✅ Secure token generation

---

## 🐛 Troubleshooting

### Problem: MongoDB Connection Error

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Make sure MongoDB is installed
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Verify: `mongosh`

### Problem: Email Not Sending

**Solution:**
1. Check `EMAIL_USER` in `.env` (your Gmail address)
2. Check `EMAIL_PASSWORD` in `.env` (App Password, not regular password)
3. Make sure 2-Step Verification is enabled in Gmail
4. Generate new App Password if needed
5. Check spam folder

### Problem: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
1. Change `PORT` in `.env` to 5001
2. Update `API_URL` in `client/app.js`:
   ```javascript
   const API_URL = 'http://localhost:5001/api';
   ```

### Problem: npm: command not found

**Solution:**
Install Node.js from: https://nodejs.org/

### Problem: Graph Not Showing Data

**Solution:**
1. Make sure you're logged in
2. Add at least one measurement
3. Check browser console (F12) for errors
4. Verify backend is running

### Problem: Cannot GET /api/...

**Solution:**
Backend is not running. Start it:
```bash
cd server
npm run dev
```

### Problem: Collections Not Appearing in Compass

**Solution:**
Collections are created when you add data:
1. Run `node test-database.js` to populate sample data
2. Or register a user and add data through the app
3. Refresh MongoDB Compass

---

## 📊 Project Statistics

- **Total Files:** 34+
- **Lines of Code:** 3000+
- **API Endpoints:** 15
- **Frontend Pages:** 8
- **Database Collections:** 7
- **Dependencies:** 10 (backend)
- **CDN Libraries:** 2 (frontend)

---

## 🎯 Quick Commands Reference

### Development
```bash
# Install dependencies
cd server && npm install

# Start backend
cd server && npm run dev

# Start frontend
cd client && python -m http.server 3000

# Populate database
cd server && node test-database.js

# Test API
cd server && node test-api.js
```

### MongoDB
```bash
# Start MongoDB
net start MongoDB  # Windows
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux

# Connect to MongoDB
mongosh

# View collections
use ContractFarming
show collections
db.users.find()
```

### Testing
```bash
# Test login credentials (after running test-database.js)
Username: testuser
Password: password123
```

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error messages in terminal/console
3. Verify environment variables in `.env`
4. Check MongoDB is running
5. Ensure all dependencies are installed

---

## 🎉 Success Indicators

You'll know everything is working when:

✅ Backend terminal shows "MongoDB Connected"  
✅ Frontend loads without errors  
✅ You can register and receive verification email  
✅ You can login after verifying email  
✅ You can see farmer listings  
✅ You can create contracts and download PDF  
✅ You can add measurements and see graph update  
✅ MongoDB Compass shows all collections with data  

---

**Made with ❤️ for farmers and agricultural businesses**

**Version:** 1.0.0  
**Last Updated:** March 5, 2024  
**License:** Educational Use
