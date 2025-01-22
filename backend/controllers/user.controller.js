import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';

export const createUserController = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();

        delete user._doc.password;

        res.status(201).json({user,token})
    }catch(error){
        res.status(400).send(error.message)
    }
}

export const loginController = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({ errors:'Invalid credentials' })
        }
        
        const isMatch = await user.isValidPassword(password);        

        if(!isMatch){
            return res.status(401).json({ errors:'Invalid credentials' });
        }

        const token = await user.generateJWT();

        delete user._doc.password;

        res.status(200).json({ user,token });  
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const profileController = async (req,res,next) => {
    try {
        console.log(req.user);

        // Send the response with user data
        return res.status(200).json({
            user: req.user,
        });
    } catch (error) {
        next(error); // Forward the error to the error-handling middleware
    }
}

export const logoutController = async (req,res) => {
    try {
        
        // find token
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24); //60(sec) * 1hr * 24 => 24hr

        res.status(200).json({
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.log(error);

        res.status(400).send(error.message);
        
    }
}