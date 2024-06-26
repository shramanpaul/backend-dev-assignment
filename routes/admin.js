const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getAllUsers,
    getUserDetails,
    deleteUser
} = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', auth, getAllUsers);
router.get('/user/:username', auth, getUserDetails);
router.delete('/user/:username', auth, deleteUser);

module.exports = router;
