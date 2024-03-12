import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const JoinRoom = () => {

    const socket= io("http://localhost:8080");
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [roomid,setRoomId]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!username || !roomid){
            return
        }
        socket.emit("join room",{id:roomid,username})
        localStorage.setItem("username",username)
        navigate(`/${roomid}`)
    }

    useEffect(() => {
        const name=localStorage.getItem("username");
        if(name){
            setUsername(name);
        }
    }, [])
    
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-fuchsia-600'>
        <form onSubmit={handleSubmit} className="flex flex-col bg-white gap-4 justify-center items-center p-4 border-2 border-black rounded-md shadow-lg">
            <div className="flex flex-col gap-2">
                <label htmlFor="">Your Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className='px-3 py-2 w-full border-2 border-gray-400' placeholder='What should we call you?'/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="">Room ID</label>
                <input value={roomid} onChange={(e)=>setRoomId(e.target.value)} type="text" className='px-3 py-2 w-full border-2 border-gray-400' placeholder='Room ID'/>
            </div>

            <button type="submit" className='w-full px-3 py-2 bg-fuchsia-700 text-white hover:bg-fuchsia-600'>Join Game</button>
        </form>
    </div>
  )
}

export default JoinRoom