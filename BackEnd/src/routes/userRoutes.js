const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Updated routes to match Firebase authentication
router.post('/register', userController.registerUser); // Register a new user
router.post('/login', userController.loginUser); // Login user
router.post('/logout', protect, userController.logoutUser); // Logout user
router.get('/profile', protect, userController.getUserProfile); // Get user profile


module.exports = router;
