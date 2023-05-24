const express = require('express')
const cors = require('cors')
const morgan  = require('morgan')
const database = require('./database/config')
const userRouter = require('./routes/userRouter')
const doctorRouter = require('./routes/doctorRouter')
const adminRouter = require('./routes/adminRouter')
const messageRouter = require('./routes/messagesRoute')
const app = express()   
const socket = require('socket.io')

//------------------------------------------------ Requiring DOTENV -------------------------------------
require('dotenv').config()



//------------------------------------------------ MIDDLE WARES -------------------------------------

app.use(express.json())
app.use(cors({
    origin: '*',
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
}))
app.use(morgan('dev'))


//-------------------------------------------------- PORT -------------------------------------

const port = process.env.PORT
//-------------------------------------------------- API -------------------------------------

app.use('/api',userRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/admin',adminRouter)
app.use('/api/message',messageRouter)


//------------------------------------------------- SERVER -------------------------------------

const server = app.listen(port,()=>{console.log(`server started at port ${port}`)})

//------------------------------------------------- SOCKET IO -------------------------------------
const io = socket(server,{
    cors:{
        origin: "*",
        credential:true
    }
})

global.onlineUsers = new Map()

// io.on('connection',(socket)=>{
//     global.chatSocket = socket
//     socket.on('addUser',(userId)=>{
//     onlineUsers.set(userId,socket.id)
// })
// socket.on("sendMessage",(data)=>{
//     const sendUserSocket = onlineUsers.get(data.to)
//     if(sendUserSocket){
//         socket.to(sendUserSocket.emit('messageRecieve',data.message))
//     }
// })
// })

io.on('connection', (socket) => { 
    console.log('user connected')
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket,"bingo");
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});