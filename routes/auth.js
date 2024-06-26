const express = require('express');
const router = express.Router();
const { register, validateOtp, updateUserInfo, login, getUserInfo } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);

router.post('/validate-otp', validateOtp);

router.put('/update-info', updateUserInfo);

router.post('/login', login);

router.get('/user-info', auth, getUserInfo);

module.exports = router;
