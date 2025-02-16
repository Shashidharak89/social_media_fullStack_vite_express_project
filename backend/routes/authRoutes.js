// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, verifyToken ,pageload} = require('../controllers/authController');

// Public Routes
router.post('/signup', register);
router.post('/login', login);

// Protected Route with Token as URL Parameter
router.get('/verify/:token', verifyToken);

router.get('/pageload',pageload);

module.exports = router;
