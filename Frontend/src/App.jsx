import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import JoinRoom from './components/JoinRoom'
import GamePage from './components/GamePage'
import { Socket, io } from 'socket.io-client'

const App = () => {

  useEffect(() => {
   var socket= io("http://localhost:8080");
  }, [])
  
  return (
<div className='min-h-screen w-full'>
<Routes>

  <Route path='/' element={<JoinRoom/>}/>
  <Route path='/:id' element={<GamePage/>}/>

</Routes>

</div>
  )
}

export default App