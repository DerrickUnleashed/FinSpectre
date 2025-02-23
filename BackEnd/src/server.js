const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const firebase = require('firebase-admin');
const userRoutes = require('./routes/userRoutes');
const { initializeFirebase } = require('./config/firebase');
const connectDB = require('./config/db');


const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
//console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT_SECRET for debugging



const app = express();

const port = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase
initializeFirebase();

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stocks', require('./routes/stockRoutes'));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
