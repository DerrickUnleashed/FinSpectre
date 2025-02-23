const admin = require('firebase-admin');

const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = await admin.auth().verifyIdToken(token); // Use Firebase Admin SDK to verify the token

     // console.log("Decoded Token:", decoded); // Log the decoded token for debugging

      let user = await User.findOne({ uid: decoded.uid });
      if (!user) {
        // Create new user if doesn't exist
        user = new User({
          uid: decoded.uid,
          email: decoded.email || '',
          displayName: decoded.name || ''
        });
        await user.save();
      }
      req.user = user;
      next();

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
