import React, { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({x:-100,y:-100});
  useEffect(() => { const move=(e:MouseEvent)=>setPosition({x:e.clientX,y:e.clientY}); window.addEventListener("mousemove",move); return()=>window.removeEventListener("mousemove",move); }, []);
  return <><div className="custom-cursor outer" style={{left:position.x,top:position.y}}/><div className="custom-cursor inner" style={{left:position.x,top:position.y}}/></>;
}
