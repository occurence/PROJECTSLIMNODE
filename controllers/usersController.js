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
        if(existingUser) {return res.status(409).json({ message: 'Email in use' });}
    
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
            }
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
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(existingUser._id, { token, refreshToken });
        res.status(200).json({
            token,
            refreshToken,
            user: {
                email: existingUser.email,
            }
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const logoutUser = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: "" });
        res.status(204).json({ message: 'User successfully logged out' });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const getCurrentUser = async (req, res) => {
    try {
        const { name, email} = req.user;
        res.status(200).json({ name, email });
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
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const refreshUser = async (req, res) => {
    try {
        const { email } = req.user;
        const existingUser = await User.findOne({ email });
        if(!existingUser) {return res.status(401).json({ message: 'Email or password is wrong' });}

        const payload = { id: existingUser._id };
        // const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "23h" });
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" });
        await User.findByIdAndUpdate(existingUser._id, { token });
        res.status(200).json({
            token,
            user: {
                email: existingUser.email,
            }
        });
    } catch (error) {res.status(500).json({ message: error.message });}
}
export { signupUser, loginUser, logoutUser, getCurrentUser, updateUser, refreshUser };