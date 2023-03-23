const express = require('express')
const cors = require('cors')
const morgan  = require('morgan')
const database = require('./database/config')
const userRouter = require('./routes/userRouter')
const doctorRouter = require('./routes/doctorRouter')


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



// API 
app.use('/api',userRouter)
app.use('/api/doctor',doctorRouter)



// Start server
app.listen(port,()=>{console.log(`server started at port ${port}`)})