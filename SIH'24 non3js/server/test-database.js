require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ContractFarming', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  isVerified: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const farmerSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  company: String,
  location: String,
  age: Number,
  description: String,
  image: String,
  specialization: [String],
  experience: Number,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const contractSchema = new mongoose.Schema({
  companyId: mongoose.Schema.Types.ObjectId,
  farmerId: mongoose.Schema.Types.ObjectId,
  companyName: String,
  farmerName: String,
  contractDate: Date,
  product: String,
  quantity: Number,
  pricePerUnit: Number,
  totalAmount: Number,
  email: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const measurementSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  value: Number,
  unit: String,
  type: String,
  createdAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Farmer = mongoose.model('Farmer', farmerSchema);
const Contract = mongoose.model('Contract', contractSchema);
const Measurement = mongoose.model('Measurement', measurementSchema);

// Test Data
async function populateDatabase() {
  try {
    console.log('\n🚀 Starting database population...\n');

    // Clear existing data (optional)
    await User.deleteMany({});
    await Farmer.deleteMany({});
    await Contract.deleteMany({});
    await Measurement.deleteMany({});
    console.log('✅ Cleared existing data\n');

    // Create Test User
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      username: 'testuser',
      email: 'test@farmconnect.com',
      password: hashedPassword,
      role: 'company',
      isVerified: true
    });
    console.log('✅ Created User:', user.username);

    // Create Farmers
    const farmers = await Farmer.insertMany([
      {
        userId: user._id,
        name: 'John Smith',
        company: 'Green Fields Co.',
        location: 'California, USA',
        age: 45,
        description: 'Specializes in organic vegetables with 20 years of farming experience.',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        specialization: ['Organic Farming', 'Vegetables', 'Sustainable Agriculture'],
        experience: 20,
        isActive: true
      },
      {
        userId: user._id,
        name: 'Maria Garcia',
        company: 'Sunshine Farms',
        location: 'Texas, USA',
        age: 38,
        description: 'Expert in sustainable farming practices and crop rotation.',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        specialization: ['Sustainable Farming', 'Crop Rotation', 'Corn'],
        experience: 15,
        isActive: true
      },
      {
        userId: user._id,
        name: 'Robert Johnson',
        company: 'Harvest Time',
        location: 'Iowa, USA',
        age: 52,
        description: 'Focuses on corn and soybean production with modern equipment.',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
        specialization: ['Corn', 'Soybeans', 'Modern Farming'],
        experience: 25,
        isActive: true
      }
    ]);
    console.log(`✅ Created ${farmers.length} Farmers`);

    // Create Contracts
    const contracts = await Contract.insertMany([
      {
        companyId: user._id,
        farmerId: farmers[0]._id,
        companyName: 'Green Fields Co.',
        farmerName: 'John Smith',
        contractDate: new Date(),
        product: 'Organic Tomatoes',
        quantity: 5000,
        pricePerUnit: 3.50,
        totalAmount: 17500,
        email: 'test@farmconnect.com',
        status: 'active'
      },
      {
        companyId: user._id,
        farmerId: farmers[1]._id,
        companyName: 'Sunshine Farms',
        farmerName: 'Maria Garcia',
        contractDate: new Date(),
        product: 'Organic Corn',
        quantity: 10000,
        pricePerUnit: 2.25,
        totalAmount: 22500,
        email: 'test@farmconnect.com',
        status: 'pending'
      }
    ]);
    console.log(`✅ Created ${contracts.length} Contracts`);

    // Create Measurements
    const measurements = await Measurement.insertMany([
      { userId: user._id, value: 120, unit: 'kg', type: 'production' },
      { userId: user._id, value: 135, unit: 'kg', type: 'production' },
      { userId: user._id, value: 128, unit: 'kg', type: 'production' },
      { userId: user._id, value: 142, unit: 'kg', type: 'production' },
      { userId: user._id, value: 138, unit: 'kg', type: 'production' },
      { userId: user._id, value: 150, unit: 'kg', type: 'production' },
      { userId: user._id, value: 145, unit: 'kg', type: 'production' }
    ]);
    console.log(`✅ Created ${measurements.length} Measurements`);

    // Summary
    console.log('\n📊 DATABASE POPULATION COMPLETE!\n');
    console.log('Summary:');
    console.log(`  • Users: ${await User.countDocuments()}`);
    console.log(`  • Farmers: ${await Farmer.countDocuments()}`);
    console.log(`  • Contracts: ${await Contract.countDocuments()}`);
    console.log(`  • Measurements: ${await Measurement.countDocuments()}`);
    console.log('\n✅ You can now view these collections in MongoDB Compass!');
    console.log('   Refresh Compass and expand the ContractFarming database.\n');
    console.log('🔐 Test Login Credentials:');
    console.log('   Username: testuser');
    console.log('   Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error populating database:', error);
    process.exit(1);
  }
}

// Run the population
populateDatabase();
