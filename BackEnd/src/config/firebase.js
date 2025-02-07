const admin = require("firebase-admin");
const serviceAccount = require("../finspectrefirebaseconfig.json"); // Add Firebase service account JSON here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
