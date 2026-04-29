const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');
const { protect, verifiedOnly } = require('../middleware/auth');

// Get all measurements for logged-in user
router.get('/', protect, verifiedOnly, async (req, res) => {
  try {
    const measurements = await Measurement.find({ userId: req.user._id })
      .sort('-createdAt')
      .limit(100);
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create measurement
router.post('/', protect, verifiedOnly, async (req, res) => {
  try {
    const measurement = await Measurement.create({
      userId: req.user._id,
      ...req.body
    });
    res.status(201).json(measurement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get measurements by contract
router.get('/contract/:contractId', protect, verifiedOnly, async (req, res) => {
  try {
    const measurements = await Measurement.find({ 
      contractId: req.params.contractId,
      userId: req.user._id
    }).sort('-createdAt');
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
