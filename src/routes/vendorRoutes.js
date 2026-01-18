const express = require('express');
const validate = require('../middlewares/validate'); // Need to check if this middleware exists, usually in these boilerplates it does. If not I need to create it.
const vendorValidation = require('../validations/vendorValidation');
const vendorController = require('../controllers/vendorController');

const router = express.Router();

router.post('/register', validate(vendorValidation.register), vendorController.register);
router.post('/login', validate(vendorValidation.login), vendorController.login);

module.exports = router;
