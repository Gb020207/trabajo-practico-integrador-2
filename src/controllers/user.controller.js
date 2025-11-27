import { User } from "../models/user.models.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const createUser= async (req, res) => {
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
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        return res.json({
            ok:true,
            data: users
        })

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok:false,
            msg:"Error del servidor"
        })    
    }
    
}
export const getAllUserAndDelete = async (req, res) => {
    try {
        const users = await User.find().setOptions({includeDelete: true});
        return res.json({
            ok:true,
            data: users
        })

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok:false,
            msg:"Error del servidor"
        })    
    }
    
}
export const getUserById = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                msg:"ID invalido, coloque un ID existente"
            })
        }
        const user = await User.findById(id);
        return res.status(200).json({
            ok:true,
            data: user
        })
    } catch (error) {
        console.log(error);
            return res.status(200).json({
            ok:false,
            msg:"Error del servidor",
        })
    }
}
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {username, email, password} = req.body;
    try {
         if(!id || !username || !email || !password){
            return res.status(400).json({
                msg:"ID invaido o los campos requeridos estan vacios"
            })
        }
        const user = await User.findByIdAndUpdate(
            id,
            {username, email, password},
            {new: true},
            {deleteAt: new Date()}

        )
        return res.status(201).json({
            ok:true,
            msg:"Usuario actualizado con exito",
            data: user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        })
    }
    
}
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
           if(!id){
            return res.status(400).json({
                msg:"Usuario ya eliminado o el ID proporcionado es invalido"
            })
        }
        const user = await User.findByIdAndDelete(id)
        return res.status(200).json({
            ok: true,
            msg: "Usuario eliminado exitosamente",
            data: user,
        })
    } catch (error) {
            console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        }) 
    }
}
export const softDeleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            {deleteAt: new Date()},
            {new: true}
        );

        if(!user){
            return res.status(400).json({
                msg: "Usuario no encontrado coloque un id valido"
            })
        }
        return res.status(200).json({
            msg:"Usuario eliminado (soft delete)",
            data: user,
        })
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"error del servidor"
        })
    }
    
}