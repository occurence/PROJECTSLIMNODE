import { User } from '../models/usersModel.js';
import { signupValidation, loginValidation, updateValidation } from '../validation/validation.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { SECRET_KEY, REFRESH_SECRET_KEY, PORT } = process.env;

const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { error } = signupValidation.validate(req.body);
        if(error) {return res.status(400).json({ message: 'Missing required email or password field' });}

        const existingUser = await User.findOne({ email });
        if(existingUser) {return res.status(409).json({ message: 'Email already registered' });}
    
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            user: {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
            },
            message: 'Registrations successful'
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const loginUser = async (req, res) => {
    try {
        const { error } = loginValidation.validate(req.body);
        if(error) {return res.status(401).json({ message: 'Missing required email or password field' });}

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(!existingUser) {return res.status(401).json({ message: 'Email or password is wrong' });}

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {return res.status(401).json({ message: 'Password is wrong' });}

        const payload = { id: existingUser._id };
        const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(existingUser._id, { accessToken, refreshToken });
        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
            message: 'Login successful'
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const logoutUser = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { accessToken: "" });
        res.status(204).json({
            message: 'Logout successful' });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const getCurrentUser = async (req, res) => {
    try {
        const { name, email} = req.user;
        res.status(200).json({ name, email, message: 'Get current user successful'});
    } catch (error) {res.status(500).json({ message: error.message });}
}

const updateUser = async (req, res) => {
    try {
        const { error } = updateValidation.validate(req.body);
        if(error) {return res.status(400).json({ message: error.message });}

        const { _id } = req.user;
        const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true, });
        res.status(200).json({
            name: updatedUser.name,
            email: updatedUser.email,
            message: 'Update successful'
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const refreshUser = async (req, res) => {
    try {
        const { email } = req.user;
        const refreshTokenFromHeader = req.headers['authorization']?.split(' ')[1];
        const existingUser = await User.findOne({ email });
        if(!existingUser) {return res.status(401).json({ message: 'Email or password is wrong' });}
        if (!refreshTokenFromHeader || existingUser.refreshToken !== refreshTokenFromHeader) {return res.status(401).json({ message: 'Refresh token expired' });}
        const payload = { id: existingUser._id };
        console.log('Verifying refresh token...');
        const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(existingUser._id, { accessToken, refreshToken });
        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                email: existingUser.email,
                message: 'Refresh successful'
            }
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const refreshToken = async () => {
    try {
        const payload = { id: existingUser._id };
        const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(existingUser._id, { accessToken, refreshToken });
        res.status(200).json({
            accessToken,
            refreshToken,
            message: 'Refresh successful'
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}
export { signupUser, loginUser, logoutUser, getCurrentUser, updateUser, refreshUser, refreshToken };