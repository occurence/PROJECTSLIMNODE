import jwt from 'jsonwebtoken';
import { User } from '../models/usersModel.js';
import 'dotenv/config';

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const authenticateToken = async (req, res, next) => {
    const { authorization="" } = req.headers;
    console.log('Authorization header received: ', authorization);
    const [bearer, token] = authorization.split(' ');
    if(bearer !== 'Bearer' || !token) {console.log('Invalid authorization format or missing token');
        return res.status(401).json({ message: 'Not authorized' });}

    try {
        console.log('Verifying token...');
        const { id } = jwt.verify(token, SECRET_KEY);
        console.log('Token verified, user ID: ', id);
        const user = await User.findById(id);
        if(!user || user.token !== token || !user.token) {console.log('User not found or token mismatch');
            return res.status(401).json({ message: 'Not authorized' });}

        req.user = user;
        console.log('User authenticated successfully: ', user.email);
        next();
    } catch (error) {console.log('Error verifying token: ', error.message);
        // if(error.message === 'jwt expired'){
        //     const { authorization="" } = req.headers;
        //         console.log('Authorization header received: ', authorization);
        //         const [bearer, refreshToken] = authorization.split(' ');
        //         if(bearer !== 'Bearer' || !refreshToken) {console.log('Invalid authorization format or missing refresh token');
        //             return res.status(401).json({ message: 'Not authorized' });}

        //         try {
        //             console.log('Verifying refresh token...');
        //             const { id } = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
        //             console.log('Refresh token verified, user ID: ', id);
        //             const user = await User.findById(id);
        //             if(!user || user.refreshToken !== refreshToken || !user.refreshToken) {console.log('User not found or refresh token mismatch');
        //                 return res.status(401).json({ message: 'Not authorized' });}

        //             req.user = user;
        //             console.log('User authenticated successfully: ', user.email);
        //             next();
        //         } catch (error) {console.log('Error verifying refresh token: ', error.message);
        //             return res.status(401).json({ message: 'Not authorized'});}
        // }
        return res.status(401).json({ message: 'Not authorized'});
    }
}

const authenticateRefreshToken = async (req, res, next) => {
    const { authorization="" } = req.headers;
    console.log('Authorization header received: ', authorization);
    const [bearer, refreshToken] = authorization.split(' ');
    if(bearer !== 'Bearer' || !refreshToken) {console.log('Invalid authorization format or missing refresh token');
        return res.status(401).json({ message: 'Not authorized' });}

    try {
        console.log('Verifying refresh token...');
        const { id } = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
        console.log('Refresh token verified, user ID: ', id);
        const user = await User.findById(id);
        if(!user || user.refreshToken !== refreshToken || !user.refreshToken) {console.log('User not found or refresh token mismatch');
            return res.status(401).json({ message: 'Not authorized' });}

        req.user = user;
        console.log('User authenticated successfully: ', user.email);
        next();
    } catch (error) {console.log('Error verifying refresh token: ', error.message);
        return res.status(401).json({ message: 'Not authorized'});}
}

export { authenticateToken, authenticateRefreshToken };