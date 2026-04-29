const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide farmer name']
  },
  company: {
    type: String,
    required: [true, 'Please provide company name']
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  age: {
    type: Number,
    required: [true, 'Please provide age']
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  image: {
    type: String,
    default: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  specialization: [String],
  experience: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Farmer', farmerSchema);
