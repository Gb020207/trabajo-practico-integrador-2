import { model, Schema, Types } from "mongoose";

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

export const Article = model("Article", articleSchema);