const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllUsers } = require('../controllers/adminController');
const authAdmin = require('../middleware/authAdmin');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', authAdmin, getAllUsers);

module.exports = router;

