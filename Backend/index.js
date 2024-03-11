const express=require('express');
const cors=require('cors');
const morgan = require('morgan');
const http = require('http');
const router=express.Router();

const app=express();
const server=http.createServer(app)

app.use(cors({
    credentials:true,
    origin:'*'
}))
app.use(morgan('dev'));



router.get('/',()=>{
    console.log("Route Setup")
})


server.listen(8080,()=>{
    console.log("Server Started");
})
const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'*'
    }
})

io.on("connection",(socket)=>{
    // console.log(`${socket.id} Joined`);
    console.log("Socket Connected")

    socket.on("join room",(room)=>{
        socket.join(room.id);
        console.log(`${socket.id} Joined Room `,room.id)
    })
    socket.on("drawing", (data) => {
        socket.broadcast.emit("drawing", data);
      });
      socket.on("draw pause", (data) => {
        socket.broadcast.emit("draw pause", data);
      });
    
      socket.on("disconnect", () => {
        console.log(`${socket.id} Left`);
      });
})
