import mongoose from "mongoose"
import { Task } from "../../../db/models/task.model.js"
import { AppError } from "../../utils/AppError.js"

export const addTask = async (req, res, next) => {
    const { task, completed, dueDate } = req.body

        // Convert dueDate to a Date object for comparison
        const dueDateObj = new Date(dueDate);

        if(task == ''){
            return next(new AppError('task cannot be empty', 400));
        }

        // Check if dueDate is in the past
        if (dueDateObj.getTime() < Date.now()) {
            return next(new AppError('Due date cannot be in the past', 400));
        }

    const newTask = new Task({
        task,
        completed,
        dueDate,
        user: req.authUser._id
    })
    const createdTask = await newTask.save()
    res.status(201).json({ message: 'Task added successfully', success: true, data: createdTask })
}

export const updateTask = async (req, res, next) => {
    const { task, completed, dueDate } = req.body
    const { id } = req.params

    const updatedTask = await Task.findByIdAndUpdate({ _id: id, user: req.authUser._id }, { task, completed, dueDate }, { new: true })
    res.status(200).json({ message: 'Task updated successfully', success: true, data: updatedTask })
}

export const deleteTask = async (req, res, next) => {
    const { id } = req.params
    const deletedTask = await Task.findByIdAndDelete({ _id: id, user: req.authUser._id })
    res.status(200).json({ message: 'Task deleted successfully', success: true, data: deletedTask })
}

export const getTasks = async (req, res, next) => {
    const tasks = await Task.find({ user: req.authUser._id })
    res.status(200).json({ success: true, data: tasks })
}