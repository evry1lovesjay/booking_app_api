import express from "express"

const router = express.Router()

router.get("/", (req,res)=>{
    res.json("Hello, this is auth endpoint")
})

export default router