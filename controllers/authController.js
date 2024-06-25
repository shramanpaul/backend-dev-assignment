const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const sendOtpEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP for Account Verification',
        text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};

exports.register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // checking if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // checking if email is already registered
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
        });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const newOtp = new Otp({ email, otp });
        await newOtp.save();

        await sendOtpEmail(email, otp);

        // save user but not activated
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully, please verify your email' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//validate Otp 
exports.validateOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const validOtp = await Otp.findOne({ email, otp });
        if (!validOtp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { isActive: true },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserInfo = async (req, res) => {
    const { email, location, age, work, dob, description } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { location, age, work, dob, description },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
