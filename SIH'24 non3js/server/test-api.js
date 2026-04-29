require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ContractFarming', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Models
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  role: String,
  isVerified: Boolean,
  createdAt: Date
}));

const Farmer = mongoose.model('Farmer', new mongoose.Schema({
  name: String,
  company: String,
  location: String,
  specialization: [String]
}));

const Contract = mongoose.model('Contract', new mongoose.Schema({
  companyName: String,
  farmerName: String,
  product: String,
  quantity: Number,
  totalAmount: Number,
  status: String
}));

const Measurement = mongoose.model('Measurement', new mongoose.Schema({
  value: Number,
  type: String,
  createdAt: Date
}));

// Test API Functions
async function testAPI() {
  try {
    console.log('\n🧪 TESTING MONGODB API OPERATIONS\n');
    console.log('='.repeat(50));

    // Test 1: Count Documents
    console.log('\n📊 TEST 1: Counting Documents');
    console.log('-'.repeat(50));
    const userCount = await User.countDocuments();
    const farmerCount = await Farmer.countDocuments();
    const contractCount = await Contract.countDocuments();
    const measurementCount = await Measurement.countDocuments();
    
    console.log(`✅ Users: ${userCount}`);
    console.log(`✅ Farmers: ${farmerCount}`);
    console.log(`✅ Contracts: ${contractCount}`);
    console.log(`✅ Measurements: ${measurementCount}`);

    // Test 2: Fetch All Users
    console.log('\n👥 TEST 2: Fetching All Users');
    console.log('-'.repeat(50));
    const users = await User.find().select('-password');
    users.forEach(user => {
      console.log(`✅ User: ${user.username} (${user.email}) - Role: ${user.role} - Verified: ${user.isVerified}`);
    });

    // Test 3: Fetch All Farmers
    console.log('\n👨‍🌾 TEST 3: Fetching All Farmers');
    console.log('-'.repeat(50));
    const farmers = await Farmer.find();
    farmers.forEach(farmer => {
      console.log(`✅ Farmer: ${farmer.name} - Company: ${farmer.company} - Location: ${farmer.location}`);
      console.log(`   Specialization: ${farmer.specialization.join(', ')}`);
    });

    // Test 4: Fetch All Contracts
    console.log('\n📄 TEST 4: Fetching All Contracts');
    console.log('-'.repeat(50));
    const contracts = await Contract.find();
    contracts.forEach(contract => {
      console.log(`✅ Contract: ${contract.companyName} ↔ ${contract.farmerName}`);
      console.log(`   Product: ${contract.product} - Quantity: ${contract.quantity} - Amount: $${contract.totalAmount}`);
      console.log(`   Status: ${contract.status}`);
    });

    // Test 5: Fetch All Measurements
    console.log('\n📈 TEST 5: Fetching All Measurements');
    console.log('-'.repeat(50));
    const measurements = await Measurement.find().sort('createdAt');
    console.log(`✅ Found ${measurements.length} measurements:`);
    measurements.forEach((m, index) => {
      console.log(`   ${index + 1}. Value: ${m.value} ${m.unit} - Type: ${m.type} - Date: ${m.createdAt.toLocaleDateString()}`);
    });

    // Test 6: Aggregate Statistics
    console.log('\n📊 TEST 6: Aggregate Statistics');
    console.log('-'.repeat(50));
    const avgMeasurement = await Measurement.aggregate([
      { $group: { _id: null, average: { $avg: '$value' }, max: { $max: '$value' }, min: { $min: '$value' } } }
    ]);
    if (avgMeasurement.length > 0) {
      console.log(`✅ Average Measurement: ${avgMeasurement[0].average.toFixed(2)}`);
      console.log(`✅ Max Measurement: ${avgMeasurement[0].max}`);
      console.log(`✅ Min Measurement: ${avgMeasurement[0].min}`);
    }

    const totalContractValue = await Contract.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    if (totalContractValue.length > 0) {
      console.log(`✅ Total Contract Value: $${totalContractValue[0].total.toLocaleString()}`);
    }

    // Test 7: Search Operations
    console.log('\n🔍 TEST 7: Search Operations');
    console.log('-'.repeat(50));
    const organicFarmers = await Farmer.find({ specialization: 'Organic Farming' });
    console.log(`✅ Farmers specializing in Organic Farming: ${organicFarmers.length}`);
    organicFarmers.forEach(f => console.log(`   - ${f.name} (${f.company})`));

    const activeContracts = await Contract.find({ status: 'active' });
    console.log(`✅ Active Contracts: ${activeContracts.length}`);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ ALL API TESTS COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log('\n💡 Your MongoDB database is working perfectly!');
    console.log('   You can now use these collections in your Express API.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error testing API:', error);
    process.exit(1);
  }
}

// Run the tests
testAPI();
