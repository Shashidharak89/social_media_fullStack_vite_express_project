const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, { expiresIn: '1h' });
    res.status(201).json({ 
      token, 
      name: newUser.name, 
      email: newUser.email 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ 
      token, 
      name: user.name, 
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify Token
exports.verifyToken = (req, res) => {
  const token = req.params.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    try {
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ 
        userId: decoded.userId,
        name: user.name, 
        email: user.email 
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};

// Page Load
exports.pageload = (req, res) => {
  res.status(200).send(true);
};

// Get All Users (except passwords)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
