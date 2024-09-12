import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect('mongodb+srv://omerbagprog:Lx6X9u7ZyeJtB87a@cluster0.89df3.mongodb.net/todoFullStack').then(()=>{
        console.log('db connected successfully');
    })
}