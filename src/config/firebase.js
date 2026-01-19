const admin = require("firebase-admin");
require("dotenv").config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is missing in .env");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;
