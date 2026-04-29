const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const { protect, verifiedOnly } = require('../middleware/auth');

// Get all farmers
router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.find({ isActive: true }).populate('userId', 'username email');
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single farmer
router.get('/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id).populate('userId', 'username email');
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create farmer profile (protected route)
router.post('/', protect, verifiedOnly, async (req, res) => {
  try {
    const farmer = await Farmer.create({
      userId: req.user._id,
      ...req.body
    });
    res.status(201).json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update farmer profile
router.put('/:id', protect, verifiedOnly, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    if (farmer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedFarmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
