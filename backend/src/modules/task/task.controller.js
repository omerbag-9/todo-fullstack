import { Task } from "../../../db/models/task.model.js"

export const addTask = async(req, res, next) => {
    const {task , completed , dueDate} = req.body

    const newTask = new Task({
        task,
        completed,
        dueDate
    })
    const createdTask = await newTask.save()
    res.status(201).json({message: 'Task added successfully', success: true, data: createdTask})
}

export const updateTask = async(req, res, next) => {
    const {task , completed , dueDate} = req.body
    const {id} = req.params

    const updatedTask = await Task.findByIdAndUpdate(id, {task , completed , dueDate}, {new: true})
    res.status(200).json({message: 'Task updated successfully', success: true, data: updatedTask})
}

export const deleteTask = async(req, res, next) => {
    const {id} = req.params
    const deletedTask = await Task.findByIdAndDelete(id)
    res.status(200).json({message: 'Task deleted successfully', success: true, data: deletedTask})
}

export const getTasks = async(req, res, next) => {
    const tasks = await Task.find()
    res.status(200).json({success: true, data: tasks})
}