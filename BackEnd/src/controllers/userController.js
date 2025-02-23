const firebase = require('firebase-admin');
const { auth, admin } = require('../config/firebase'); // Import Firebase auth and admin


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
    });

    // Create user in MongoDB
    const user = new User({
      uid: userRecord.uid,
      email: email,
      password: password,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in with Firebase
    const userRecord = await auth.getUserByEmail(email);

    
    // Here you would need to implement your own password verification logic
    // since the Admin SDK does not handle password authentication directly.

    // Create a JWT token
    const jwtToken = jwt.sign({ uid: userRecord.uid }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login user' });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  res.json({ message: 'User logged out successfully' });
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get user profile' });
  }
};
