const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require('../../serviceAccountKey.json');

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

module.exports = admin;
