import { model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    task:[{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

export const User = model('User', userSchema)