const admin = require("firebase-admin");
const serviceAccount = require("../finspectrefirebaseconfig.json");

const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("🔥 Firebase Admin Initialized");
  }
};

module.exports = { initializeFirebase, admin };
