import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError.js"
import { User } from "../../db/models/user.model.js"

export const isAuthenticated = () => {
    return async (req, res, next) => {
        const {token} = req.headers
        if(!token){
            return next(new AppError('Please login first', 401))
        }
        let payload = null
        try{
        payload = jwt.verify(token, 'secretKey')
        }catch(err){
            return next(new AppError(err.message, 500))
        }
        if(!payload?._id){
            return next(new AppError('invalid payload', 401))
        }
        const user = await User.findById(payload._id)
        if(!user){
            return next(new AppError('user not found', 401))
        }
        req.authUser = user
        next()
    }
}