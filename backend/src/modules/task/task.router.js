import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addTask, deleteTask, getTasks, updateTask } from "./task.controller.js";

export const taskRouter = Router()

// add task
taskRouter.post('/',asyncHandler(addTask))

// update task
taskRouter.put('/:id',asyncHandler(updateTask))

// delete task
taskRouter.delete('/:id',asyncHandler(deleteTask))

// get tasks
taskRouter.get('/',asyncHandler(getTasks))