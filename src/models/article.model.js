import { model, Schema, Types } from "mongoose";
import { Comment } from "./comment.models.js";
const articleSchema = new Schema({
    title :{
        type: String,
        minLength: 3,
        maxLenght: 200,
        required: true,
    },
content : {
    type: String,
    minLength: 50,
    required: true,
},
 excerpt: {
    type: String, 
    maxLenght: 500,
    required: false,
},

 status :{
    type: String, 
    enum: ['published', 'archived'],
     default: 'published'
    },
 author :{
    type: Types.ObjectId,
    ref: 'User',
    required: true,
 },
tags:[{
    type: Types.ObjectId,
    ref: 'tag',
    required: false,
}]
})
articleSchema.pre("findOneAndDelete", async function (next) {
    const articleId = this.getQuery()._id;

    console.log("Articulo eliminado", articleId);

    await Comment.deleteMany({article: articleId});

    next();
    
})

export const Article = model("Article", articleSchema);