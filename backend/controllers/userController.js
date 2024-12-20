import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = createToken(user._id);
        res.json({
            success: true, token, user: {
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        // check user exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validation email format and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter Strong password" });
        }

        // bcrypt user password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        // generate token
        const token = createToken(user._id)//_id in automatic generat by monodb
        res.json({
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


export { loginUser, registerUser }