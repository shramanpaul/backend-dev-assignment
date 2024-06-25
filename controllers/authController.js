const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { email, username, password } = req.body;

    // Checking if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        email,
        username,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
