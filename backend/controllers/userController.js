import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';

const otpStore = {};

// Nodemailer Transporter (Email)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'himanshu77jangid@gmail.com',
        pass: 'nmdz xqad mhoq qphi', // Ensure this is an App Password if 2FA is enabled
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

const createToken = (id) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter valid email' });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please Enter Strong password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate OTP and expiry time in-memory
        const otp = generateOtp();
        const otpExpiredAt = new Date(Date.now() + 10 * 60 * 1000);

        // Store OTP and expiration time in memory
        otpStore[email] = { otp, otpExpiredAt };

        console.log(`OTP stored for ${email}:`, otp); // Log for debugging

        // Send OTP via email
        await transporter.sendMail({
            from: 'himanshu77jangid@gmail.com',
            to: email,
            subject: 'Your OTP for Registration',
            text: `Your OTP is: ${otp}. It is valid for 10 minutes`,
        });

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Verify OTP
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if OTP exists in the memory store
        const storedOtpData = otpStore[email];

        if (!storedOtpData) {
            return res.status(404).json({
                success: false,
                message: 'OTP not generated or expired',
            });
        }

        const { otp: storedOtp, otpExpiredAt } = storedOtpData;

        // Convert both OTPs to strings 
        if (String(storedOtp) !== String(otp) || new Date() > new Date(otpExpiredAt)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP',
            });
        }

        // OTP is valid, remove it from memory store
        delete otpStore[email];

        // Generate JWT token
        const user = await userModel.findOne({ email });
        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            message: 'OTP verified successfully',
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export { loginUser, registerUser, verifyOtp };
