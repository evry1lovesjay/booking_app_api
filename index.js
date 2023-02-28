import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth-routes.js"
import usersRoute from "./routes/users-routes.js"
import hotelsRoute from "./routes/hotels-routes.js"
import roomsRoute from "./routes/rooms-routes.js"
import cookieParser from "cookie-parser"

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
        throw error
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
app.use(cookieParser())
app.use(express.json())

// if theres a req to "/auth", use the authRoute
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