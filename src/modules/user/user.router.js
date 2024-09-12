import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { login, signup,logout } from "./user.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

export const userRouter = Router()

userRouter.post('/signup',asyncHandler(signup)) 
userRouter.post('/login',asyncHandler(login)) 
userRouter.post('/logout',isAuthenticated(),asyncHandler(logout)) 
