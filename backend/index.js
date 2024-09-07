import express from 'express'
import { connectDB } from './db/connection.js'
import { taskRouter } from './src/modules/task/task.router.js'
import { userRouter } from './src/modules/user/user.router.js'
import { globalErrorHandler } from './src/utils/asyncHandler.js'

const app = express()
const port = 3000
connectDB()
app.use(express.json())

app.use('/task',taskRouter)
app.use('/user',userRouter)
app.use(globalErrorHandler)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})