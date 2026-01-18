const admin = require('../config/firebase');
const db = admin.firestore();
const jwt = require('jsonwebtoken');

/**
 * Create a new vendor in Firestore
 * @param {Object} vendorData
 * @returns {Object} Created vendor object
 */
const createVendor = async (vendorData) => {
    // Check if vendor already exists by mobile number or vendorId (optional check)
    const usersRef = db.collection('vendors');
    const snapshot = await usersRef.where('mobileNumber', '==', vendorData.mobileNumber).get();

    if (!snapshot.empty) {
        throw new Error('Vendor with this mobile number already exists');
    }

    // Also check email if needed, but mobile is primary for login
    const emailSnapshot = await usersRef.where('email', '==', vendorData.email).get();
    if (!emailSnapshot.empty) {
        throw new Error('Vendor with this email already exists');
    }

    // Create vendor document
    // We can use vendorId as document ID or let Firestore generate one. 
    // Since vendorId is input, we might want to store it as a field or use it as key.
    // Using auto-generated ID is safer for uniqueness unless vendorId is guaranteed unique system-wide.
    // For now, I'll let Firestore generate the ID and store vendorId as a field.

    const newVendor = {
        ...vendorData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        role: 'vendor'
    };

    const res = await db.collection('vendors').add(newVendor);
    return { id: res.id, ...newVendor };
};

/**
 * Login vendor by mobile number
 * @param {String} mobileNumber
 * @returns {Object} { vendor, token }
 */
const loginVendor = async (mobileNumber) => {
    const usersRef = db.collection('vendors');
    const snapshot = await usersRef.where('mobileNumber', '==', mobileNumber).get();

    if (snapshot.empty) {
        throw new Error('Vendor not found');
    }

    // User found
    let vendor = null;
    let docId = null;
    snapshot.forEach(doc => {
        vendor = doc.data();
        docId = doc.id;
    });

    // Generate JWT
    const token = jwt.sign(
        { sub: docId, role: vendor.role || 'vendor', mobileNumber: vendor.mobileNumber },
        process.env.JWT_SECRET,
        { expiresIn: '30d' } // Long expiration for mobile app usually
    );

    return { vendor: { id: docId, ...vendor }, token };
};

module.exports = {
    createVendor,
    loginVendor,
};
