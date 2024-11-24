import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendJwt } from "../utils/sendJwt.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ 
            $or: [ {email}, {username} ] 
        });
        if (user) return next(new ErrorHandler("User already exists", 400));
        const hashedPwd = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPwd });
        sendJwt(user._id, res, "User registered successfully!")
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ 
            $or: [ {email}, {username: email} ] 
        }).select("+password");
        if (!user) return next(new ErrorHandler("User does not exist", 404));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid email or password"));
        sendJwt(user._id, res, "User logged in successfully!")
    } catch (error) {
        next(error);
    }
}

export const myInfo = async (req, res) => {
    try {
        res.status(200)
            .json({
                success: true,
                user: req.user,
            })
    } catch (error) {
        next(error);
    }
}