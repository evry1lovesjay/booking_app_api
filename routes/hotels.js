import express from "express"
import { createHotel, deleteHotel, getHotels, getHotel, updateHotel } from "../controllers/hotel.js"
import Hotel from "../models/hotels.js"

const router = express.Router()

// CREATE
router.post("/", createHotel)

// UPDATE
router.put("/:id", updateHotel)

// DELETE
router.delete("/:id", deleteHotel)

// GET
router.get("/:id", getHotel)

// GET ALL
router.get("/", getHotels)




export default router