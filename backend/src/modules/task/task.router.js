import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addTask, deleteTask, getTasks, updateTask } from "./task.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

export const taskRouter = Router()

// add task
taskRouter.post('/',
    isAuthenticated(),
    asyncHandler(addTask))

// update task
taskRouter.put('/:id',
    isAuthenticated(),
    asyncHandler(updateTask))

// delete task
taskRouter.delete('/:id',
    isAuthenticated(),
    asyncHandler(deleteTask))

// get tasks
taskRouter.get('/',
    isAuthenticated(),
    asyncHandler(getTasks))