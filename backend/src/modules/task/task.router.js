import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addTask } from "./task.controller.js";

export const taskRouter = Router()

// add task
taskRouter.post('/',asyncHandler(addTask))