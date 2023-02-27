import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

// const express = require("express") --- standard nodejs method to export...
// using es6 method
const app = express()

dotenv.config()

// connecting to mongoDB via mongoose.........................
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("connected to mongoDB")
    } catch (error){
        handleError(error)
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})


// writing our apis........................................

// app.get("/", (req, res)=>{
//     res.json("Hello first request!")
// })

// middlewares.............................................

app.use(express.json())

// if theres a req to "/auth", use the authRo ute
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

// middleware to handle errors.............................
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack,
    })
})

    
app.listen(6500, () => {
    connect()
    console.log("Connected to backend...")
})