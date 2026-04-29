const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register
router.post('/register', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const user = await User.create({
      username,
      email,
      password,
      role: role || 'company',
      verificationToken,
      verificationTokenExpire
    });

    await sendVerificationEmail(email, username, verificationToken);

    res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify Email
router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ 
        message: 'Please verify your email before logging in',
        isVerified: false
      });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resend Verification Email
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await sendVerificationEmail(email, user.username, verificationToken);

    res.json({ message: 'Verification email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
