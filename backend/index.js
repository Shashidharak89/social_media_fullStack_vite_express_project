const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


// Connect to MongoDB (Cleaned up)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
