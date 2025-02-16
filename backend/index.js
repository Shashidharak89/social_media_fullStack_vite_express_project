const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS

const app = express();
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: '*', // Your Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Import Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const conversationRoutes=require('./routes/conversationRoutes');
app.use('/api/conversations',conversationRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
