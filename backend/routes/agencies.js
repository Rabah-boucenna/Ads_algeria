const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agency = require('../models/agency');
const Post = require('../models/post');
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.agencyId = decoded.agencyId; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location, profileDescription } = req.body;
    const existingAgency = await Agency.findOne({ email });
    if (existingAgency) return res.status(400).json({ error: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const agency = new Agency({ name, email, password: hashedPassword, location, profileDescription });
    await agency.save();
    const token = jwt.sign({ agencyId: agency._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({
      message: 'Agency registered successfully',
      token,
      agency: { id: agency._id, name: agency.name, email: agency.email, location: agency.location }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const agency = await Agency.findOne({ email }).select('+password');
    if (!agency) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, agency.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ agencyId: agency._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Login successful',
      token,
      agency: { id: agency._id, name: agency.name, email: agency.email, location: agency.location }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const agency = await Agency.findById(req.agencyId).select('-password').populate('posts');
    if (!agency) return res.status(404).json({ error: 'Agency not found' });
    res.json(agency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, location, profileDescription } = req.body;
    const agency = await Agency.findByIdAndUpdate(
      req.agencyId,
      { name, location, profileDescription, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated', agency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/posts', authMiddleware, async (req, res) => {
  try {
    const { title, category, description, priceRange, location, imageURL } = req.body;
    const post = new Post({
      title,
      agency: req.agencyId,
      category,
      description,
      priceRange,
      location,
      imageURL
    });
    await post.save();
    await Agency.findByIdAndUpdate(req.agencyId, { $push: { posts: post._id } });
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
