import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded);
    next();
}

export default isAuthenticated;