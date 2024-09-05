import express from 'express'
import { connectDB } from './db/connection.js'
import { taskRouter } from './src/modules/task/task.router.js'

const app = express()
const port = 3000
connectDB()

app.use('/task',taskRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})