import React from 'react'
import JoinedUsers from './JoinedUsers'
import DrawingCanvas from './DrawingCanvas'
import ChatBox from './ChatBox'

const GamePage = () => {
  return (
    <div className='grid grid-cols-7 justify-center items-center'>

        {/* <JoinedUsers/> */}
        <DrawingCanvas/>
        <ChatBox/>
    </div>
  )
}

export default GamePage