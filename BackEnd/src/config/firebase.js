const admin = require("firebase-admin");
const serviceAccount = require("../finspectrefirebaseconfig.json");
const { getAuth } = require("firebase-admin/auth"); // Import Firebase Auth
const connectDB = require("./db"); // Import MongoDB connection



const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("🔥 Firebase Admin Initialized");
  }
};

initializeFirebase(); // Ensure Firebase is initialized first
const auth = getAuth(); // Initialize Firebase Auth



module.exports = { initializeFirebase, admin, auth }; // Export auth and db
