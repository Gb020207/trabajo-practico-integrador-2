import { User } from "../models/user.models.js";

export const createUser = async (req, res) => {
    const {username, email, password, role, profile} = req.body;
    try {
        if(username === "" || username === undefined || email === "" || email === undefined || password === "" || password === undefined || role === "" || role === undefined || profile === "" || profile === undefined){
            return res.status(400).json({
                ok: false,
                msg: "todos los campos son requeridos"
            })
        }
        const user = await User.create({username, email, password, role, profile});
        return res.status(201).json({
            ok: true,
            msg: "Usuario creado exitosamente",
            data: user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error del servidor",
        })

    }
    
}