import React, { useEffect, useMemo, useState } from "react";

export default function ProductBackground() {
  const [mouse, setMouse] = useState({x:0,y:0});
  const particles = useMemo(() => Array.from({length: 32}, (_, i) => ({ id:i, left:(i*29)%100, top:(i*47)%100, size:1+(i%3), delay:(i%8) })), []);
  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x:(e.clientX/window.innerWidth-.5)*12, y:(e.clientY/window.innerHeight-.5)*12 });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="product-background" aria-hidden="true">
    <div className="ambient-glow"/>
    <div className="background-ring bg-ring-one" style={{transform:`translate(${mouse.x}px,${mouse.y}px)`}}/>
    <div className="background-ring bg-ring-two" style={{transform:`translate(${-mouse.x}px,${-mouse.y}px)`}}/>
    {particles.map(p => <i key={p.id} style={{left:`${p.left}%`,top:`${p.top}%`,width:p.size,height:p.size,animationDelay:`${p.delay}s`}}/>)}
  </div>;
}
