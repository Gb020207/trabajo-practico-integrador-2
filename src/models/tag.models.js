import { model, Schema } from "mongoose";

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

export const Tag = model("Tag", Tagschema)