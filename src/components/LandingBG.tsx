"use client"

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const LandingBG = () => {

  const app = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(".belon0", {y:1000},{y:-1000, duration: 2, delay:2, ease: "none"})
    gsap.fromTo(".belon1", {y:1000},{y:-1000, duration: 2, delay:2.7, ease: "none"})
    gsap.fromTo(".belon2", {y:1000},{y:-1000, duration: 2, delay:3, ease: "none"})
    gsap.fromTo(".belon3", {y:1000},{y:-1000, duration: 2, delay:2.85, ease: "none"})

    gsap.fromTo(".kamera", {y:1000},{y:0,x:100, duration:4, delay:3.3, ease: "elastic"})

    const t1= gsap.timeline({repeat:-1, delay:7});
    t1.to(".kamera",{x:300,duration:4})
    t1.to(".kamera",{x:100,duration:4})
  }, [])


  return (
    <main>
    <div ref={app} className="flex justify-between absolute z-100">
        {Array.from({length: 7}, (_, i) => (
            <img key={i} className={"w-[15vw] belon"+ Math.abs(3-i)} src="/belon.png"/>))}
    </div>
        <div className="w-80 h-80 bg-[url('/kamera.png')] bg-cover kamera"></div>
    </main>
  )
}
export default LandingBG
