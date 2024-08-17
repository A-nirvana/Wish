"use client"

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const GSquare = () => {

    const app = useRef<HTMLDivElement>(null);
    const tl = useRef<GSAPTimeline>()
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        gsap.to(e.target, { rotation: '50', yoyo: true, repeat: 1 })
      }
      const onEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        gsap.to(e.target, { scale: 1.2 });
      };
    
      const onLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        gsap.to(e.target, { scale: 1 });
      };
  
    useLayoutEffect(() => {
  
      let ctx = gsap.context(() => {
  
        tl.current = gsap.timeline({ yoyo: true, repeat: -1 })
          .to(".square", { rotate: 360, x:100, y:144, duration: 1 })
          .to(".square2", { x: 200, duration: 1})
  
      }, app);
  
      return () => ctx.revert()
  
    }, [])
  
  
    return (
      <div ref={app}>
        <div className="square h-36 w-36 rounded-full bg-cover text-9xl font-black" >A</div>
        <div className="square2 h-80 w-60 bg-cover text-9xl font-black" onMouseEnter={onEnter} onMouseLeave={onLeave}>B</div>
      </div>
  )
}
export default GSquare
