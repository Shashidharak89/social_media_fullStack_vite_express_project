// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authController');

// Public Routes
router.post('/signup', register);
router.post('/login', login);

// Protected Route with Token as URL Parameter
router.get('/verify/:token', verifyToken);

module.exports = router;
