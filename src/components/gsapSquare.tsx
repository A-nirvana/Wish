"use client"

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const GSquare = () => {

  const app = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>()

  useLayoutEffect(() => {
    fetch('/flower.svg').then(res=>{
      res.text().then(svg=>{
        if(svgContainerRef.current)
        svgContainerRef.current.innerHTML = svg
        anim();
      })
    })

    const anim = () => {
      gsap.to(".sav", {
        duration: 3,
        rotate: 360,
        repeat: -1,
        yoyo: true
      });
    }

    let ctx = gsap.context(() => {

      tl.current = gsap.timeline()
        .from(".square", { rotate: 360, x: -100, y: -400, duration: 0.5})
        .from(".square2", { x: -800, duration: 0.5 })
        .from(".spart", { y: 800, duration: 0.5, ease: "back" })
        .from(".hpart", { x: 1200, duration: 0.5})

    }, app);

    return () => ctx.revert()

  }, [])


  return (
    <div ref={app} className="flex">
        <div className="square text-9xl font-black" >W</div>
        <div className="square2 text-8xl font-black font-sans"><div ref={svgContainerRef} className="sav -mb-4"></div>I</div>
        <div className="spart text-9xl font-black" >s</div>
        <div className="hpart text-9xl font-black">h</div>
    </div>
  )
}
export default GSquare
