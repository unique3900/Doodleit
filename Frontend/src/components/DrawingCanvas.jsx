import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const DrawingCanvas = () => {
  const [hasMouseStopped, setHasMouseStopped] = useState(false);
  const [xcoordinate, setXcoordinate] = useState(null);
  const [ycoordinate, setYcoordinate] = useState(null);

  const socket= io("http://localhost:8080");
  

  const ref = useRef();
  const params=useParams();

  useEffect(() => {

    const drawBox = document.getElementById("drawBox").getBoundingClientRect();


    const canvas = ref.current;
    canvas.width = drawBox.width;
    canvas.height = drawBox.height -60;

    const ctx = canvas.getContext("2d");

    socket.on("drawing",({x,y})=>{
        ctx.lineTo(x, y);
        ctx.stroke();
    })

    socket.on("draw pause",({x,y})=>{
        ctx.moveTo(x,y)
    })
  }, []);


  
  const handleMouseMove = async (e) => {
    const ctx = canvas.getContext("2d");
    var x = e.clientX - 220;
    var y = e.clientY -30 ;

    if (hasMouseStopped) {
      ctx.lineTo(x, y);
      ctx.stroke();

      socket.emit("drawing",{x,y})
    }
  };
  const handleMouseDown = (e) => {
    const ctx = canvas.getContext("2d");
    var x = e.clientX - 220;
    var y = e.clientY -30;
    ctx.moveTo(x, y);
    socket.emit("draw pause",{x,y})
    setHasMouseStopped(true);
  };
  const handleMouseUp = (e) => {
    setHasMouseStopped(false);
  };

  return (
    <div className="col-span-4 w-full min-h-screen " id="drawBox">
      <canvas
        ref={ref}
        id="canvas"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="border-2 border-black mt-10"
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
