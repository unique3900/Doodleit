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
    console.log("Connected to socket.io");
})