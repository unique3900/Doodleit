import React, { useState } from 'react'
import { io } from 'socket.io-client';

const JoinedUsers = () => {
  const [joinedusers,setJoinedUsers]=useState([]);
  const socket = io("http://localhost:8080");

  socket.on("joined user updated",(data)=>{
    setJoinedUsers(data)
  })
  return (
    <div className='col-span-1'>
      {joinedusers.map((item,index)=>(
        <p className="" key={index}>{item.name}</p>
      ))}
    </div>
  )
}

export default JoinedUsers