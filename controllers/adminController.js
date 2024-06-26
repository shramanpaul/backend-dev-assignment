const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const emailExists = await Admin.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email,
            username,
            password: hashedPassword,
        });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginAdmin = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const admin = await Admin.findOne({ 
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }] 
        });

        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
