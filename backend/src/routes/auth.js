const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User'); // Assume a User model exists

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');

  // 2. Validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send('Invalid credentials');

  // 3. Create JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;