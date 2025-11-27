import { comparePasswords, hashPassword } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/Jwt.js";
import { User } from "../models/user.models.js";


export const register = async (req, res) => {
    const {username, email, password ,role, profile} = req.body;
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
        profile,
        role,
        password: hashed,
      })
      await newUser.save();
      res.status(201).json({
        ok:true,
        msg: "Usuario creado",
        data:newUser,
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
        console.log("Este es el usuario", user)
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
        const token = signToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
              maxAge: 1000 * 60 * 60,


        })
        res.json({
            msg:"usuario logeado",
            token,
            user:{id: user._id, 
                username: user.username, 
                email: user.email,
                role:user.role}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error del servidor",
        })
    }
}
export const Userprofile = async (req, res) => {
    return res.json({
       id: req.user._id,
       email:req.user.email,
       profile:req.user.profile
    })
    
}
export const logout = (req, res) => {
res.clearCookie("token"); // Eliminar cookie del navegador
return res.json({ message: "Logout exitoso" });
};

export const updateProfile = async (req, res) => {
    const {firstName, lastName} = req.body
   try {
    console.log("Usuario autenticado en req.user", req.user);
    if(!req.user){
        return res.status(401).json({
            msg:"Usuario no autenticado",
        })   }
    const Userprofile = await User.findByIdAndUpdate(req.user._id,{
        $set:{
            "profile.firstName": firstName,
            "profile.lastName": lastName,
        }
    },
{new:true, runValidators:true, select:"-password"});
 if(!Userprofile){
    return res.status(401).json({
        msg:"Usuario no encontrado",
    })
 }
 console.log(Userprofile,"este es tu usuario");
    res.status(200).json({
        msg:"Perfil actualizado",
        data: Userprofile.profile,
    })
  
   } catch (error) {
    console.log(error);
    res.status(500).json({
        msg:"error del servidor",
    })
   }
    
}
