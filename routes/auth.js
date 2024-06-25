const express = require('express');
const router = express.Router();
const { register, validateOtp, updateUserInfo } = require('../controllers/authController');

router.post('/register', register);

router.post('/validate-otp', validateOtp);

router.put('/update-info', updateUserInfo);

module.exports = router;
