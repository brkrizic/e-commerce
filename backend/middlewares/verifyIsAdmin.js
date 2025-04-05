import User from "../model/User.js";
import { verifyToken } from "../utils/verifyToken.js";

export const verifyIsAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if(!token){
            return res.status(401).json({ message: "Unauthorized. No token found."})
        }

        const decodedUser = verifyToken(token);

        const user = await User.findById(decodedUser.id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if(!user.isAdmin){
            return res.status(403).json({ message: "Access denied. Admins only." });
        } 
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
}