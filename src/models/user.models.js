import { model, Schema } from "mongoose";

const Userschema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        minLength: 3,
        maxLength: 20,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "El email no es válido"]
    },
    password:{
        type: String,
        required: true,
        unique: false,
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'

    },
    profile:{
        firstName:{
            type: String,
            required:true,
            minLength: 2,
            maxLength: 50,
        },
        lastName:{
            type: String,
            required:true,
            minLength: 2,
            maxLength: 50,
        },
        biography:{
            type: String,
            maxLength: 500,
            required: false,
        },
        avatarURL:{
            type: String,
            required: false,

        },
        birthDate:{
            type: Date,
            required: false,
        }
    }
},
{
    timestamps: true,
    versionKey: false,
},
)

export const User = model('User', Userschema)