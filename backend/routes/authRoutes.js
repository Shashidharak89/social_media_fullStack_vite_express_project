// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyToken,
  pageload,
  getAllUsers,
} = require('../controllers/authController');

// Public Routes
router.post('/signup', register);

router.post('/login', login);

// Protected Route with Token as URL Parameter
router.get('/verify/:token', verifyToken);

router.get('/pageload', pageload);

router.get('/users', getAllUsers);

module.exports = router;
