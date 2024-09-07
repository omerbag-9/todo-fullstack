import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { login, signup } from "./user.controller.js";

export const userRouter = Router()

userRouter.post('/signup',asyncHandler(signup)) 
userRouter.post('/login',asyncHandler(login)) 