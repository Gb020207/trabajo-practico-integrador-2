import { Article } from "../models/article.model.js";

export const createArticle = async (req, res) => {
    const {title, content,excerpt,status,author,tags} = req.body;
  
    try {
          if(!title || !content  || !status || !author){
        return res.status(400).json({
            ok: false,
            msg: "Todos los campos son necesarios",})
    }
        const article = await Article.create({title, content,excerpt,status,author,tags})
        return res.status(201).json({
            ok: true,
            msg: "Articulo creado",
            data: article
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error del servidor",
        })
    }
}
export const getAllArticle = async (req, res) => {
    try {
        const articles = await Article.find().populate('author');
        return res.json({
            ok:true,
            data: articles
        })

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok:false,
            msg:"Error del servidor"
        })    
    }
    
}
export const getArticleById = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                msg:"ID invalido, coloque un ID existente"
            })
        }
        const article = await Article.findById(id).populate('author');
        console.log(article)
        return res.status(200).json({
            ok:true,
            data: article,
        })
    } catch (error) {
        console.log(error);
            return res.status(200).json({
            ok:false,
            msg:"Error del servidor",
        })
    }
}
export const updateArticle = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    try {
         if(!id || !title || !content){
            return res.status(400).json({
                msg:"ID invalido o los campos requeridos estan vacios"
            })
        }
        const article = await Article.findByIdAndUpdate(
            id,
            {title, content},
            {new: true}

        )
        return res.status(201).json({
            ok:true,
            msg:"Usuario actualizado con exito",
            data: article,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        })
    }
    
}
export const deleteArticle = async (req, res) => {
    const {id} = req.params;
    try {
           if(!id){
            return res.status(400).json({
                msg:"Articulo ya eliminado o el ID proporcionado es invalido"
            })
        }
        const article = await Article.findByIdAndDelete(id).populate('author')
        return res.status(200).json({
            ok: true,
            msg: "Articulo eliminado exitosamente",
            data: article,
        })
    } catch (error) {
            console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error del servidor",
        }) 
    }
}
