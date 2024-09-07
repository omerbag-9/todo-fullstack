import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    task: String,
    completed: {
        type: Boolean,
        default: false
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    dueDate: Date,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
})

export const Task = model('Task', taskSchema)