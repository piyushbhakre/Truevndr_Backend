const Joi = require('joi');

const register = {
    body: Joi.object().keys({
        vendorId: Joi.string().required().label('Vendor ID'),
        shopName: Joi.string().required().label('Shop Name'),
        fullName: Joi.string().required().label('Full Name'),
        email: Joi.string().email().required().label('Email'),
        mobileNumber: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({ 'string.pattern.base': 'Mobile number must be a valid 10-digit number' })
            .label('Mobile Number'),
        shopCategory: Joi.string().required().label('Shop Category'),
        addressLine1: Joi.string().required().label('Address Line 1'),
        addressLine2: Joi.string().allow('').optional().label('Address Line 2'),
        city: Joi.string().required().label('City'),
        country: Joi.string().default('India').label('Country'),
        googleMapLink: Joi.string().uri().required().label('Google Map Link'),
        termsAccepted: Joi.boolean().valid(true).required().messages({
            'any.only': 'You must accept the terms and conditions'
        }).label('Terms and Conditions'),
    }),
};

const login = {
    body: Joi.object().keys({
        mobileNumber: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({ 'string.pattern.base': 'Mobile number must be a valid 10-digit number' })
            .label('Mobile Number'),
    }),
};

module.exports = {
    register,
    login,
};
