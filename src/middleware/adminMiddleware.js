export const adminMiddleware = async (req, res, next) => {
    if(req.user?.role !== "admin"){
        return res.status(403).json({ msg: "No es admin, no puedes acceder a esta funcion"})
    }
    next();
}