import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//Protected Routes token base
//@ts-ignore
export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // Check if Authorization header exists and follows 'Bearer <token>' format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "Authorization header missing or malformed" });
        }
        const token = authHeader.split(" ")[1]; // Extract token part after 'Bearer'
        console.log("Authorization header:", req.headers.authorization);
        console.log("Extracted token:", token);
        // Verify the token using JWT secret
        // @ts-ignore
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Attach decoded user info to the request object
        next(); // Proceed to next middleware
    }
    catch (error) {
        console.error("JWT Verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user && user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middlelware",
        });
    }
};
