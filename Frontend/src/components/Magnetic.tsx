import React, { useEffect, useRef } from "react";

interface MagneticProps { children: React.ReactNode; strength?: number; className?: string; }
export default function Magnetic({children,strength=.15,className=""}:MagneticProps) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=ref.current;if(!el||window.innerWidth<768)return;const move=(e:MouseEvent)=>{const r=el.getBoundingClientRect();const x=(e.clientX-(r.left+r.width/2))*strength;const y=(e.clientY-(r.top+r.height/2))*strength;el.style.transform=`translate3d(${x}px,${y}px,0)`};const leave=()=>{el.style.transform="translate3d(0,0,0)"};el.addEventListener("mousemove",move);el.addEventListener("mouseleave",leave);return()=>{el.removeEventListener("mousemove",move);el.removeEventListener("mouseleave",leave)}},[strength]);
  return <div ref={ref} className={`magnetic ${className}`}>{children}</div>;
}
