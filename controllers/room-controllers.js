import Room from "../models/Room-models.js"
import Hotel from "../models/Hotel-models.js"
import {createError} from "../utils/error.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id},
            })
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}

export const updateRoom = async (req, res, next)=>{    
        
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedRoom)
    }catch(err){
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next)=>{    
        
    try{
        await Room.updateOne(
            {"roomNumbers._id": req.params.id},
            {$push: {"roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        )

        res.status(200).json("Room status has been updated!!!.")
    }catch(err){
            next(err)
        }
}

export const deleteRoom = async (req, res, next)=>{
    const hotelId = req.params.hotelId   

    try{
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id},
            })
        }catch(err){
            next(err)
        }
        res.status(200).json("Room has been deleted!!!....")
    }catch(err){
        next(err)
    }
}

export const getRoom = async (req, res, next)=>{
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}

export const getRooms = async (req, res, next)=>{
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }catch(err){
        next(err)
    }
}


// app.get("/todos", async (req, res) => {
//     const todos = await Todo.find()

//     res.json(todos)
// })

// app.post("/todos/new", (req, res) => {
//     const todo = new Todo({
//         text: req.body.text
//     })

//     todo.save()
//     res.json(todo)
// })

// app.delete("/todos/delete/:id", async(req, res) => {
//     const result = await Todo.findByIdAndDelete(req.params.id)

//     res.json(result)
// })

// app.get("/todos/complete/:id", async (req, res)=> {
//     const todo = await Todo.findById(req.params.id)

//     todo.complete = !todo.complete
    
//     todo.save()

//     res.json(todo)
// })