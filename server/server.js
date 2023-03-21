const express = require('express')
const cors = require('cors')
const morgan  = require('morgan')

const database = require('./database/config')
const userRouter = require('./routes/userRouter')

// Requiring DOTENV
require('dotenv').config()

// Requiring express
const app = express()

// middleware 
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

// Port 
const port = process.env.PORT

// Get Request
app.get('/',(req,res)=>{
    res.status(201).json('Home Get Request')
})

// API 
app.use('/api/users',userRouter)


// Start server
app.listen(port,()=>{console.log(`server started at port ${port}`)})