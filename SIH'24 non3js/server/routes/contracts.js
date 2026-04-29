const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const { protect, verifiedOnly } = require('../middleware/auth');
const { sendContractEmail } = require('../utils/emailService');

// Get all contracts for logged-in user
router.get('/', protect, verifiedOnly, async (req, res) => {
  try {
    const contracts = await Contract.find({ companyId: req.user._id })
      .populate('farmerId')
      .sort('-createdAt');
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single contract
router.get('/:id', protect, verifiedOnly, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id).populate('farmerId');
    
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    if (contract.companyId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(contract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create contract
router.post('/', protect, verifiedOnly, async (req, res) => {
  try {
    const contract = await Contract.create({
      companyId: req.user._id,
      ...req.body
    });

    await sendContractEmail(req.body.email, {
      companyName: req.body.companyName,
      farmerName: req.body.farmerName,
      product: req.body.product,
      quantity: req.body.quantity,
      totalAmount: contract.totalAmount
    });

    res.status(201).json(contract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contract status
router.patch('/:id/status', protect, verifiedOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    if (contract.companyId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    contract.status = status;
    await contract.save();

    res.json(contract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
