const httpStatus = require('http-status');
const vendorService = require('../services/vendorService');

const register = async (req, res) => {
    try {
        const vendor = await vendorService.createVendor(req.body);
        res.status(201).send({ message: 'Vendor registered successfully', data: vendor });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const { vendor, token } = await vendorService.loginVendor(mobileNumber);
        res.status(200).send({ message: 'Login successful', data: vendor, token });
    } catch (error) {
        if (error.message === 'Vendor not found') {
            res.status(404).send({ message: error.message });
        } else {
            res.status(500).send({ message: error.message });
        }
    }
};

module.exports = {
    register,
    login,
};
