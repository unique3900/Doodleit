import React from 'react'
import JoinedUsers from './JoinedUsers'
import DrawingCanvas from './DrawingCanvas'
import ChatBox from './ChatBox'

const GamePage = () => {
  return (
    <div>

        <JoinedUsers/>
        <DrawingCanvas/>
        <ChatBox/>
    </div>
  )
}

export default GamePage