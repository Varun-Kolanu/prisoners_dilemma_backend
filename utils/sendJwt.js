import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

export const sendJwt = (id, res, message, statusCode = 200) => {
    try {
        const value = jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res
            .status(statusCode)
            .json({
                success: true,
                jwt: value,
                message
            })
    } catch (error) {
        throw new ErrorHandler(error, 500)
    }
}