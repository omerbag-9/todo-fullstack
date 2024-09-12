import { model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        default: false
    }
})

export const User = model('User', userSchema)