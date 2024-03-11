import React, { useEffect, useRef, useState } from "react";

const DrawingCanvas = () => {
  const [hasMouseStopped, setHasMouseStopped] = useState(false);
  const [xcoordinate, setXcoordinate] = useState(null);
  const [ycoordinate, setYcoordinate] = useState(null);

  const ref = useRef();

  useEffect(() => {
    const drawBox = document.getElementById("drawBox").getBoundingClientRect();
    console.log(drawBox);
    const canvas = ref.current;

    canvas.width = drawBox.width;
    canvas.height = drawBox.height;

    const ctx = canvas.getContext("2d");
  }, []);

  const handleMouseMove = async (e) => {
    const ctx = canvas.getContext("2d");
    var x = e.clientX - 220;
    var y = e.clientY;

    if (hasMouseStopped) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };
  const handleMouseDown = (e) => {
    const ctx = canvas.getContext("2d");
    var x = e.clientX - 220;
    var y = e.clientY;
    ctx.moveTo(x, y);
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
        className="border-2 border-black"
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
