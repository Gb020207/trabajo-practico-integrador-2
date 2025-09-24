import { comparePasswords, hashPassword } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/Jwt.js";
import { User } from "../models/user.models.js";


export const register = async (req, res) => {
    const {username, email, password,role , profile} = req.body;
    try {
        const userExist = await User.findOne({email})
      if(userExist){
        return res.status(400).json({
            ok: false,
            msg: "El email ya esta registrado",
        })
      }  
      if(!password){
        return res.status(400).json({
            msg:"Contraseña obligatoria"
        })
      }
      const hashed = await hashPassword(password)
      const newUser = new User({
        username,
        email,
        role,
        profile,
        password: hashed,
      })
      await newUser.save();
      res.status(201).json({
        ok:true,
        msg: "Usuario creado",
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error del servidor",
        })
    }    
}


export const login = async (req,res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"El email es incorrecto",
            })
        }
        const isMatch = await comparePasswords(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                msg:"Contraseña incorrecta",
            })
        }
        const token = signToken({email, password})
        res.json({
            msg:"usuario logeado",
            token,
            user:{id: user._id, username: user.username, email: user.email}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error del servidor",
        })
    }
}
