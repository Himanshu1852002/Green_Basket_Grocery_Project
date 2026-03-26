import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/avatars';
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const uploadAvatar = multer({ storage: avatarStorage, limits: { fileSize: 2 * 1024 * 1024 } });

const otpStore = {};

// Nodemailer Transporter (Email)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'himanshu77jangid@gmail.com',
        pass: 'nmdz xqad mhoq qphi',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);


const registerAdmin = async () => {
    try {
        const adminExists = await userModel.findOne({ email: 'admin@greenBasket.com' });
        if (adminExists) {
            console.log('Admin already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin@1234', 10);

        const admin = new userModel({
            name: 'Admin',
            email: 'admin@greenBasket.com',
            password: hashedPassword,
            role: 'admin'
        })

        await admin.save();
        console.log('Admin registered successfully');
    } catch (error) {
        console.error('Error registering admin:', error);
    }
}

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

        const token = createToken(user._id, user.role);

        if (user.role === 'admin') {
            return res.status(200).json({
                success: true,
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    userId: user._id,
                    role: 'admin'
                },
            });
        } else {
            return res.json({
                success: true,
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    userId: user._id,
                    role: 'user'
                },

            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

const createToken = (id, role) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
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
            role: 'user'
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
        // const token = createToken(user._id);
        res.status(200).json({
            success: true,
            // token,
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

        const storedOtpData = otpStore[email];

        if (!storedOtpData) {
            return res.status(404).json({
                success: false,
                message: 'OTP not generated or expired',
            });
        }

        const { otp: storedOtp, otpExpiredAt } = storedOtpData;

        if (String(storedOtp) !== String(otp) || new Date() > new Date(otpExpiredAt)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP',
            });
        }

        delete otpStore[email];

        const user = await userModel.findOne({ email });
        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            message: 'OTP verified successfully',
            user: {
                name: user.name,
                email: user.email,
                userId: user._id,
                role: 'user'
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get user count based on role
const getUserCount = async (req, res) => {
    try {
        const userCount = await userModel.countDocuments({ role: 'user' });
        res.status(200).json({ success: true, count: userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Block / Unblock user
const blockUnblockUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        user.isBlocked = !user.isBlocked;
        await user.save();
        res.status(200).json({ success: true, message: user.isBlocked ? 'User blocked' : 'User unblocked', isBlocked: user.isBlocked });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get profile
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    const { userId, name, phone, address, dob, gender, addresses, preferences } = req.body;
    try {
        const updateData = { name, phone, address, dob, gender };
        if (addresses !== undefined) updateData.addresses = typeof addresses === 'string' ? JSON.parse(addresses) : addresses;
        if (preferences !== undefined) updateData.preferences = typeof preferences === 'string' ? JSON.parse(preferences) : preferences;
        const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Upload avatar
const updateAvatar = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        const user = await userModel.findByIdAndUpdate(req.body.userId, { avatar: avatarUrl }, { new: true }).select('-password');
        res.json({ success: true, avatar: user.avatar });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Change password
const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.json({ success: false, message: 'Current password is incorrect' });
        if (newPassword.length < 8) return res.json({ success: false, message: 'Password must be at least 8 characters' });
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete account
const deleteAccount = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: 'Incorrect password' });
        await userModel.findByIdAndDelete(userId);
        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { loginUser, registerUser, verifyOtp, getUserCount, registerAdmin, getAllUsers, blockUnblockUser, getProfile, updateProfile, updateAvatar, uploadAvatar, changePassword, deleteAccount };