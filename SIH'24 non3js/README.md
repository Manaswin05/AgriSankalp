# 🌾 FarmConnect - Assured Contract Farming System

Complete MERN stack application for connecting farmers with companies.

## 📚 Documentation

**👉 Read the complete guide:** [`docs/COMPLETE_GUIDE.md`](docs/COMPLETE_GUIDE.md)

This single document contains everything you need:
- ✅ Project overview
- ✅ Technology stack
- ✅ Database structure
- ✅ Installation & setup
- ✅ How to run
- ✅ How to test
- ✅ API endpoints
- ✅ Frontend pages
- ✅ Features
- ✅ Troubleshooting

## 🚀 Quick Start

```bash
# 1. Install dependencies
cd server
npm install

# 2. Configure .env
cp .env.example .env
# Edit .env with your MongoDB URI and Gmail credentials

# 3. Start MongoDB
net start MongoDB  # Windows

# 4. Populate database (optional)
node test-database.js

# 5. Start backend
npm run dev

# 6. Start frontend (new terminal)
cd client
python -m http.server 3000

# 7. Open browser
http://localhost:3000
```

## 🧪 Test Login

After running `test-database.js`:
- **Username:** testuser
- **Password:** password123

## 📊 Database

- **Name:** ContractFarming
- **Collections:** users, farmers, contracts, measurements
- **Connection:** mongodb://localhost:27017/ContractFarming

## 🎯 Features

- User authentication with email verification
- Farmer profile management
- Contract creation with PDF generation
- Real-time analytics dashboard
- Email notifications
- Professional glassmorphism UI

---

**For complete documentation, see:** [`docs/COMPLETE_GUIDE.md`](docs/COMPLETE_GUIDE.md)
