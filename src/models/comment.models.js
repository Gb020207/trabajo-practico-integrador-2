import { model, Schema, Types } from "mongoose";

const CommentSchema = new Schema({
    content:{
        type: String,
        required: true,
        minLength:5,
        maxLength: 500,
    },
    author:{
        type: Types.ObjectId,
        ref:"User",
        required: true,
    },
    article: [{
        type: Types.ObjectId,
        ref:"article",
        required: true,
    }]
},
{
    timestamps:true,
    versionKey:false,
})

export const Comment = model("Comment", CommentSchema);
