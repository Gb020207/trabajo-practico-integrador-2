import { Tag } from "../models/tag.models.js";


export const createTag = async (req, res) => {
    const {name,description} = req.body;
    try {
        if(name === "" || name === undefined || description === "" || description === undefined){
            return res.status(400).json({
                ok: false,
                msg: "todos los campos son requeridos"
            })
        }
        const tag = await Tag.create({name, description});
        return res.status(201).json({
            ok: true,
            msg: "Tag creado exitosamente",
            data: tag,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error del servidor",
        })

    }
    
}
export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        return res.json({
            ok:true,
            data: tags,
        })

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok:false,
            msg:"Error del servidor"
        })    
    }
    
}
export const getTagById = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                msg:"ID invalido, coloque un ID existente"
            })
        }
        const tag = await Tag.findById(id);
        return res.status(200).json({
            ok:true,
            data: tag
        })
    } catch (error) {
        console.log(error);
            return res.status(200).json({
            ok:false,
            msg:"Error del servidor",
        })
    }
}
export const updateTag = async (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    try {
         if(!id || !name || !description){
            return res.status(400).json({
                msg:"ID invaido o los campos requeridos estan vacios"
            })
        }
        const tag = await Tag.findByIdAndUpdate(
            id,
            {name, description},
            {new: true}

        )
        return res.status(201).json({
            ok:true,
            msg:"Tag actualizado con exito",
            data: tag,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        })
    }
    
}
export const deleteTag = async (req, res) => {
    const {id} = req.params;
    try {
           if(!id){
            return res.status(400).json({
                msg:"Tag ya eliminado o el ID proporcionado es invalido"
            })
        }
        const tag = await Tag.findByIdAndDelete(id)
        return res.status(200).json({
            ok: true,
            msg: "Tag eliminado exitosamente",
            data: tag,
        })
    } catch (error) {
            console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        }) 
    }
}