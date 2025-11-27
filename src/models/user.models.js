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
    },
    deleteAt:{
        type: Date,
        default: null,
    }
},
{
    timestamps: true,
    versionKey: false,
},
)


Userschema.pre(/^find/, function(next){
    if(!this.getOptions().includeDelete){
        this.where({deleteAt: null})
    };
    next();
})
Userschema.method.softDelete = function(){
    this.deleteAt = new Date();
    return this.save();
}
Userschema.method.restoreUser = function(){
    this.deleteAt = null;
    return this.save();
}
export const User = model('User', Userschema)