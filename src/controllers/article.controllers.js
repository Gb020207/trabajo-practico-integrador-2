import { Article } from "../models/article.models.js";

export const createArticle = async (req, res) => {
    const {title, content,excerpt,status,author,tags} = req.body;
  
    try {
          if(!title || !content || !excerpt || !status || !author){
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
   
