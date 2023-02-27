import express from "express"

// const express = require("express") --- standard nodejs method to export...

// using es6 method

const app = express()

app.listen(6500, () => {
    console.log("Connected to backend...")
})