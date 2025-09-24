import { model, Schema } from "mongoose";
import { Article } from "./article.model.js";


const Tagschema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    description:{
        type: String,
        required: false,
        maxLength: 200,
    }
},
{
    timestamps:true,
    versionKey:false,
})

Tagschema.post("findOneAndDelete", async function (doc) {
     if(doc){
        await Article.updateMany(
            {tags: doc._id} ,
            {$pull: {tags: doc._id}}
        )
     }
})


export const Tag = model("Tag", Tagschema)