import bcrypt from 'bcrypt'
import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utils/AppError.js"
import jwt  from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { userName, password } = req.body
    const userExist = await User.findOne({ userName })
    if (userExist) {
        return next(new AppError('username already in use try another one',400))
    }
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = new User({
        userName,
        password: hashedPassword
    })
    const createdUser = await user.save()
    res.status(201).json({ message: 'user created successfully', success: true, data: createdUser })
}

export const login = async (req, res, next) => {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })
    if (!user) {
        return next(new AppError('invalid credentials', 401))
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
        return next(new AppError('invalid credentials', 401))
    }
    user.active = true
    await user.save()
    const token = jwt.sign({ _id: user._id }, 'secretKey')
    res.status(200).json({ message: 'user logged in successfully', success: true, data: user, accessToken: token })
}

export const logout = async (req, res, next) => {
    const user = await User.findById(req.authUser._id)
    user.active = false
    await user.save()
    res.status(200).json({ message: 'user logged out successfully', success: true })
}