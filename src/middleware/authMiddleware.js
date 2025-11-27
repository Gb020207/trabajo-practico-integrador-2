import { verifyToken } from "../helpers/Jwt.js";
import { User } from "../models/user.models.js";
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        const decoded = verifyToken(token);
        console.log(decoded)
        const user = await User.findById(decoded.id);
        console.log(user)
        if(!user){
            return res.status(404).json({msg:"Usuario no encontrado"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error del servidor"})
    }
    
}