import { Comment } from "../models/comment.models.js";




export const createComment = async (req, res) => {
    const {content, author, article} = req.body;
    try {
        if(content === "" || content === undefined || author === "" || author === undefined || article === "" || article === undefined){
            return res.status(400).json({
                ok: false,
                msg: "todos los campos son requeridos"
            })
        }
        const comment = await Comment.create({content, author, article});
        return res.status(201).json({
            ok: true,
            msg: "Comentario creado exitosamente",
            data: comment,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error del servidor",
        })

    }
    
}
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find(

        ).populate("article")
        .populate("author");
        return res.json({
            ok:true,
            data: comments,
        })

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok:false,
            msg:"Error del servidor"
        })    
    }
    
}
export const getCommentById = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                msg:"ID invalido, coloque un ID existente"
            })
        }
        const comment = await Comment.findById(id);
        return res.status(200).json({
            ok:true,
            data: comment,
        })
    } catch (error) {
        console.log(error);
            return res.status(200).json({
            ok:false,
            msg:"Error del servidor",
        })
    }
}
export const updateComment = async (req, res) => {
    const {id} = req.params;
    const {content} = req.body;
    try {
         if(!id || !content){
            return res.status(400).json({
                msg:"ID invaido o los campos requeridos estan vacios"
            })
        }
        const comment = await Comment.findByIdAndUpdate(
            id,
            {content},
            {new: true}

        )
        return res.status(201).json({
            ok:true,
            msg:"Comentario actualizado con exito",
            data: comment,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        })
    }
    
}
export const deleteComment = async (req, res) => {
    const {id} = req.params;
    try {
           if(!id){
            return res.status(400).json({
                msg:"Comentario ya eliminado o el ID proporcionado es invalido"
            })
        }
        const comment = await Comment.findByIdAndDelete(id)
        return res.status(200).json({
            ok: true,
            msg: "Commentario eliminado exitosamente",
            data: comment,
        })
    } catch (error) {
            console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        }) 
    }
}