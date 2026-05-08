# AgriSankalp 🌾

**Empowering Farmers Through Direct Market Access | Eliminating Middlemen | Fair Pricing for All**

---

## 📋 Table of Contents
- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Future Vision](#future-vision)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

---

## 🎯 The Problem

For decades, India's agricultural sector has faced a critical challenge: **farmer distress**. Despite government support and subsidies, the alarming rate of farmer suicides persists. The root cause isn't lack of government aid—it's **exploitation through the supply chain**.

**The Broken System:**
- 🚫 **Middlemen Monopoly**: Multiple intermediaries control the supply chain, each taking a cut
- 💔 **Unfair Pricing**: Farmers receive 30-40% less than what companies actually pay
- 📉 **Information Asymmetry**: Farmers lack real-time market data to negotiate fair prices
- 🤝 **No Direct Access**: No direct relationship between farmers and buyers

**The Impact:**
- Farmers are underpaid for their crops
- Manufacturing companies overpay for the same resources
- Consumers pay inflated prices
- Billions lost to corruption and inefficiency

---

## 💡 Our Solution

**AgriSankalp** is a revolutionary **Contract Farming Platform** that **eliminates intermediaries** and creates a **direct, transparent marketplace** between farmers and manufacturing companies.

By removing corruption and middlemen, we:
- ✅ Ensure farmers get **fair, market-based prices** for their crops
- ✅ Enable companies to **procure directly** at reasonable costs
- ✅ Create **transparency and trust** through blockchain-verified contracts
- ✅ Empower farmers with **data-driven decision making**
- ✅ Build a **sustainable agricultural ecosystem**

---

## 🔄 How It Works

### For Farmers:
1. **Register** on the platform with farm details and available crops
2. **Post** crop availability and desired pricing based on market trends
3. **Receive** direct proposals from verified manufacturing companies
4. **Negotiate** transparently without middlemen interference
5. **Execute** smart contracts for guaranteed purchase agreements
6. **Receive** fair payment directly—no middlemen involved

### For Companies:
1. **Browse** available crops from verified farmers nationwide
2. **View** real-time pricing and quality metrics
3. **Place** direct procurement contracts
4. **Track** crop growth and quality through IoT integration
5. **Execute** payment through secure channels
6. **Reduce** procurement costs by 20-30% compared to traditional channels

---

## ✨ Key Features

### 🌾 For Farmers
- **Direct Marketplace Access**: Post crops and connect directly with manufacturing companies
- **Fair Price Negotiations**: View real-time market data and historical price trends
- **Smart Contracts**: Transparent, blockchain-verified agreements with guaranteed buyback
- **Crop Tracking**: IoT-enabled monitoring of crop health and growth stages
- **Payment Guarantee**: Secure, direct payment without middlemen interference
- **Market Intelligence**: Data-driven insights on crop demand and seasonal pricing
- **Community Support**: Network with other farmers and share best practices

### 🏭 For Manufacturing Companies
- **Direct Sourcing**: Access verified farmers and quality crops nationwide
- **Cost Reduction**: Procure directly at fair prices, reducing logistics and intermediary costs
- **Contract Management**: Create, track, and manage procurement contracts
- **Quality Assurance**: Real-time crop monitoring and quality verification
- **Bulk Procurement**: Streamlined ordering and inventory management
- **Supplier Network**: Build relationships with reliable farmers for long-term partnerships
- **Analytics Dashboard**: Track pricing trends and supply chain efficiency

### 🔧 Platform Features
- **Real-Time Weather Data**: Location-specific forecasts for better crop planning
- **Price Analytics & Trends**: ML-powered insights on seasonal and off-seasonal pricing
- **IoT Integration**: Smart devices for crop and soil monitoring
- **Mobile-Responsive Design**: Access from anywhere, anytime
- **Secure Payments**: Integrated payment gateway with escrow protection
- **Ratings & Reviews**: Verified seller/buyer profiles to build trust
- **Dispute Resolution**: Fair arbitration system for transparent conflict resolution
- **Multi-Language Support**: Accessible to farmers across India

## 🛠️ Tech Stack

### Frontend
- **React.js** - Dynamic UI library for interactive interfaces
- **Three.js** - 3D graphics library for immersive marketplace visualization
- **Redux/Context API** - State management
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing and navigation

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **JWT** - JSON Web Tokens for secure authentication
- **bcryptjs** - Password hashing and encryption
- **Nodemailer** - Email notifications and alerts

### Advanced Features
- **Blockchain Integration** - Smart contracts for transparent agreements (future implementation)
- **IoT Integration** - Support for sensor data and crop monitoring devices
- **Machine Learning** - Price trend analysis and demand forecasting (planned)
- **Payment Gateway** - Razorpay/Stripe integration for secure transactions

### DevOps & Tools
- **Docker** - Containerization for consistent deployment
- **Git** - Version control
- **Postman** - API testing and documentation

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v6.0 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account) - [Get started](https://www.mongodb.com/)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manaswin05/AgriSankalp.git
   cd AgriSankalp
   ```

2. **Install dependencies**
   
   For the backend:
   ```bash
   cd backend
   npm install
   ```
   
   For the frontend:
   ```bash
   cd frontend
   npm install
   ```

### Configuration

1. **Backend Configuration**
   
   Create a `.env` file in the `backend` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/agrisankalp
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrisankalp
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   
   # Email Configuration (for notifications)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   
   # Weather API (Optional - add your weather API key)
   WEATHER_API_KEY=your_weather_api_key
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Frontend Configuration**
   
   Create a `.env.local` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run at `http://localhost:5000`

3. **In a new terminal, start the frontend**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run at `http://localhost:3000`

4. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
AgriSankalp/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Redux/Context state management
│   │   ├── services/            # API integration services
│   │   ├── styles/              # Global and component styles
│   │   ├── utils/               # Utility functions
│   │   ├── App.js               # Main App component
│   │   └── index.js             # Entry point
│   ├── public/                  # Static assets
│   ├── package.json
│   └── .env.local               # Environment variables
│
├── backend/
│   ├── routes/                  # API route handlers
│   ├── controllers/             # Business logic controllers
│   ├── models/                  # MongoDB schemas
│   ├── middleware/              # Custom middleware (auth, validation, etc.)
│   ├── utils/                   # Utility functions
│   ├── config/                  # Configuration files
│   ├── server.js                # Express app setup
│   ├── package.json
│   └── .env                     # Environment variables
│
├── docs/                        # Documentation files
├── .gitignore
└── README.md
```

## 💡 Usage

### For Farmers

1. **Sign Up / Registration**
   - Create an account with verified phone number (OTP verification)
   - Complete your farm profile: location, farm size, crops grown, certifications
   - Set up your farmer credentials and banking details

2. **List Your Crops**
   - Post available crops with quantity, quality grade, and harvest timeline
   - Set expected pricing based on market trends shown on platform
   - Add photos and detailed descriptions of your produce
   - Update availability as harvests progress

3. **Receive & Negotiate Offers**
   - View proposals from verified manufacturing companies
   - Negotiate pricing directly using market data
   - Compare multiple offers transparently
   - Use built-in price calculator for fair valuation

4. **Execute Smart Contracts**
   - Review contract terms with purchase guarantees
   - Digital signing through secure authentication
   - Set payment milestones and delivery schedules
   - Lock in fair prices before harvest season

5. **Receive Payment**
   - Get paid directly upon delivery confirmation
   - No intermediaries or hidden deductions
   - Secure payment through integrated gateway
   - Access payment history and receipts anytime

### For Manufacturing Companies

1. **Company Registration**
   - Verify business credentials and industry type
   - Set procurement requirements and budget parameters
   - Establish contact points and receiving locations

2. **Discover & Source Crops**
   - Browse available crops from verified farmers
   - Filter by quality, quantity, location, and delivery timeline
   - View farmer ratings and transaction history
   - Compare prices with historical market data

3. **Create Procurement Contracts**
   - Define specifications and quality parameters
   - Negotiate pricing transparently
   - Set delivery dates and payment terms
   - Finalize smart contracts with digital signatures

4. **Monitor & Receive**
   - Track crop growth via IoT sensors and farmer updates
   - Receive quality assurance reports before delivery
   - Confirm receipt and approve payments
   - Build long-term supplier relationships

### For Developers

Refer to the [API Documentation](#api-documentation) section for detailed endpoint information and integration examples.

## 📚 API Documentation

### Authentication Endpoints

**Register a new user**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Farmer Name",
  "email": "farmer@example.com",
  "password": "securePassword123",
  "phone": "+91XXXXXXXXXX"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "securePassword123"
}
```

### Crop Management Endpoints

**Get all crops**
```
GET /api/crops
Headers: Authorization: Bearer <token>
```

**Add a new crop**
```
POST /api/crops
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "cropName": "Rice",
  "variety": "Basmati",
  "plantedDate": "2024-05-01",
  "area": 2.5
}
```

### Weather Endpoints

**Get weather for user's location**
```
GET /api/weather
Headers: Authorization: Bearer <token>
```

### Market Data Endpoints

**Get market prices**
```
GET /api/market/prices?crop=rice&state=maharashtra
Headers: Authorization: Bearer <token>
```

For complete API documentation, check the `docs/` folder or visit the API documentation portal in the application.

## 🚀 Future Vision

AgriSankalp is actively being developed with ambitious plans to revolutionize contract farming. Here's what's on our roadmap:

### Phase 2: AI-Powered Price Prediction 🤖
- **Historical Data Analysis**: Store and analyze crop price trends from platform transactions
- **Machine Learning Models**: Train models on seasonal/off-seasonal demand patterns
- **Fair Price Recommendations**: 
  - Suggest optimal pricing for farmers to maximize earnings
  - Recommend procurement costs for companies to minimize expenses
  - Create a win-win pricing corridor that's fair to both parties
- **Demand Forecasting**: Predict future demand based on market trends and seasonality
- **Early Warnings**: Alert farmers about price fluctuations and optimal selling windows

### Phase 3: Blockchain Integration ⛓️
- **Smart Contracts**: Immutable, self-executing agreements between farmers and companies
- **Payment Escrow**: Secure third-party holding of funds until delivery confirmation
- **Transparent Audit Trail**: Complete transaction history visible to both parties
- **Dispute Resolution**: Automated arbitration based on contract terms
- **Certification**: Blockchain-verified certifications for organic/quality crops

### Phase 4: IoT & Real-Time Monitoring 📡
- **Smart Sensors**: Integration with soil moisture, temperature, and nutrient sensors
- **Live Crop Tracking**: Real-time updates on crop health and growth stages
- **Automated Alerts**: Notify farmers of issues (pest outbreaks, weather threats) and companies of readiness for harvest
- **Quality Assurance**: Pre-delivery quality checks using image recognition and sensor data
- **Logistics Optimization**: Track shipments from farm to factory in real-time

### Phase 5: Advanced Analytics & Intelligence 📊
- **Farmer Insights Dashboard**: 
  - Profitability analysis by crop and season
  - Best performing crops by region
  - Pricing optimization recommendations
- **Company Intelligence Portal**:
  - Supply chain optimization
  - Farmer network health metrics
  - Cost reduction opportunities
  - Supplier performance analytics

### Phase 6: Expansion & Ecosystem 🌍
- **Government Integration**: Link with agricultural databases and subsidy systems
- **Credit Facilitation**: Enable farmers to access credit at fair rates using contracts as collateral
- **Insurance Products**: Crop insurance tied to contract prices
- **Mobile App**: Native iOS and Android applications for wider accessibility
- **International Markets**: Expand to connect Indian farmers with global buyers

### Impact Goals:
- 🎯 Eliminate middlemen from 100,000+ farm-to-factory transactions
- 💰 Increase farmer income by 30-40% through fair pricing
- 🏭 Reduce company procurement costs by 20-25%
- 📈 Create sustainable, long-term relationships between farmers and buyers
- 💡 Build a transparent, corruption-free agricultural marketplace

---

We welcome contributions from the community! Here's how you can help:

### Getting Started with Contributing

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine
3. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit them:
   ```bash
   git commit -m "Add description of your changes"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** on the main repository

### Code Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly before submitting
- Update documentation if needed

### Reporting Issues

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment details (Node version, OS, etc.)

## 🐛 Troubleshooting

### Common Issues and Solutions

**Port Already in Use**
```bash
# For backend (port 5000)
lsof -i :5000
kill -9 <PID>

# For frontend (port 3000)
lsof -i :3000
kill -9 <PID>
```

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Verify database credentials if using MongoDB Atlas

**CORS Errors**
- Check that `CORS_ORIGIN` in backend `.env` matches your frontend URL
- Ensure backend is running and accessible

**Dependencies Installation Failed**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

**Port Forwarding Issues**
- Make sure firewall allows traffic on ports 3000 and 5000
- Use `npm start` with `--port` flag if needed:
  ```bash
  npm start -- --port 3001
  ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

### Getting Help

- **Issues & Bugs**: [Create an issue on GitHub](https://github.com/Manaswin05/AgriSankalp/issues)
- **Discussions**: Use GitHub Discussions for general questions
- **Documentation**: Check the `/docs` folder for detailed guides
- **Email**: [Add contact email if available]

### Community

- Join our community forum in the application
- Follow us on [social media platforms - add links]
- Subscribe to our newsletter for updates and tips

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped with code, ideas, and feedback
- Special thanks to the agricultural community for insights and testing
- Open source libraries and frameworks that made this possible

---

**Happy Farming! 🌱**

*Last Updated: May 2024*
