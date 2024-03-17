import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [guess, setGuess] = useState([]);
  const socket = io("http://localhost:8080");

  const handleMessageType = (e) => {
    try {
      setGuess(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      if (!guess || !user) {
        return;
      }
      socket.emit("new guess", { guess, user });
      setGuess("")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setUser(localStorage.getItem("username"));

    socket.on("new guess", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: data.user, guess: data.guess },
      ]);
    });
  }, []);

  return (
    <div className="col-span-1 h-screen flex flex-col justify-end ml-10 mt-10 mb-24">
      <div className="flex flex-col gap-1  w-full ">
        {messages?.map((item, index) => (
          <div className="flex gap-2 border-2 border-gray-500 min-w-full ">
            <p key={index} className="w-full font-bold">
              {item?.user + ":"}
            </p>
            <p className="w-full">{item?.guess}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleMessageSend} className="flex items-center gap-2">
        <input
          type="text"
          value={guess}
          onChange={handleMessageType}
          className="px-3 py-2 border-2 border-black"
        />
      </form>
    </div>
  );
};

export default ChatBox;
