import { Schema } from "mongoose";

const userSchema = new Schema({
    userName: String,
    password: String
})

export const User = model('User', userSchema)