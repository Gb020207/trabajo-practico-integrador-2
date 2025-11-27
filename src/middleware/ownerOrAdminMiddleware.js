import { Comment } from "../models/comment.models.js"


export const ownerOrAdminMiddleware = async (req,res, next) => {
    try {
        const commentId = req.params.id
    const foundComment = await Comment.findById(commentId)
    if(!foundComment){
        return res.status(404).json({
            msg:"El comentario no existe"
        })
    }
    if(res.user?.role === "admin"|| String(foundComment.author) !== String(req.user._id)) {
        return res.status(401).json({
            msg:"No eres propietario de este comentario"
        })
    }
    next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error interno del servidor"})
    }
    
    
    
}