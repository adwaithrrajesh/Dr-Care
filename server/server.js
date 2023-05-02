const express = require('express')
const cors = require('cors')
const morgan  = require('morgan')
const database = require('./database/config')
const userRouter = require('./routes/userRouter')
const doctorRouter = require('./routes/doctorRouter')
const adminRouter = require('./routes/adminRouter')
const app = express()
const http = require('http')

// Socket io
const {Server} = require('socket.io')
const server = http.createServer(app)




//------------------------------------------------ Requiring DOTENV -------------------------------------
require('dotenv').config()



//------------------------------------------------ MIDDLE WARES -------------------------------------

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


//-------------------------------------------------- PORT -------------------------------------

const port = process.env.PORT
//-------------------------------------------------- API -------------------------------------

app.use('/api',userRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/admin',adminRouter)


//------------------------------------------------- SERVER -------------------------------------

app.listen(port,()=>{console.log(`server started at port ${port}`)})

//------------------------------------------------- SOCKET IO -------------------------------------
try {
  const io  = new Server (server,{
  cors:{
    origin:"*",
    credentials:true
  }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log('here')
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
} catch (error) {
  console.log(error)
}

