const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  companyName: {
    type: String,
    required: [true, 'Please provide company name']
  },
  farmerName: {
    type: String,
    required: [true, 'Please provide farmer name']
  },
  contractDate: {
    type: Date,
    required: [true, 'Please provide contract date']
  },
  product: {
    type: String,
    required: [true, 'Please provide product name']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity']
  },
  pricePerUnit: {
    type: Number,
    required: [true, 'Please provide price per unit']
  },
  totalAmount: {
    type: Number
  },
  email: {
    type: String,
    required: [true, 'Please provide email']
  },
  image: String,
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  terms: {
    type: String,
    default: 'Standard farming contract terms and conditions apply.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

contractSchema.pre('save', function(next) {
  this.totalAmount = this.quantity * this.pricePerUnit;
  next();
});

module.exports = mongoose.model('Contract', contractSchema);
