const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  },
  value: {
    type: Number,
    required: [true, 'Please provide measurement value']
  },
  unit: {
    type: String,
    default: 'units'
  },
  type: {
    type: String,
    enum: ['production', 'quality', 'yield', 'other'],
    default: 'production'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Measurement', measurementSchema);
