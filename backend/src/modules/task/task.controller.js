import { Task } from "../../../db/models/task.model.js"

export const addTask = async(req, res, next) => {
    const {task , completed , dueDate} = req.body

    const newTask = new Task({
        task,
        completed,
        dueDate,
        user: req.authUser._id
    })
    const createdTask = await newTask.save()
    res.status(201).json({message: 'Task added successfully', success: true, data: createdTask})
}

export const updateTask = async(req, res, next) => {
    const {task , completed , dueDate} = req.body
    const {id} = req.params

    const updatedTask = await Task.findByIdAndUpdate({id,user:req.authUser._id}, {task , completed , dueDate}, {new: true})
    res.status(200).json({message: 'Task updated successfully', success: true, data: updatedTask})
}

export const deleteTask = async(req, res, next) => {
    const {id} = req.params
    const deletedTask = await Task.findByIdAndDelete({id,user:req.authUser._id})
    res.status(200).json({message: 'Task deleted successfully', success: true, data: deletedTask})
}

export const getTasks = async(req, res, next) => {
    const tasks = await Task.find({user: req.authUser._id})
    res.status(200).json({success: true, data: tasks})
}