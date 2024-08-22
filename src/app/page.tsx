"use client";

import GSquare from "@/components/gsapSquare";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";
import LandingBG from "@/components/LandingBG";
import Image from "next/image";
import { useLayoutEffect } from "react";
import gsap from "gsap";

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Home: React.FC = () => {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".crown",
      { y: 1000 },
      { y: 0, x: 0, duration: 4, delay: 3.3, ease: "elastic" }
    );

    const t1 = gsap.timeline({ repeat: -1, delay: 7 });
    t1.to(".crown", { x: 0, duration: 4 });
  }, []);
  const router = useRouter();
  return (
    <main
      className={
        "h-screen flex justify-evenly overflow-hidden bg-gray-900 " +
        pacifico.className
      }
    >
      <section className="h-full flex justify-center items-center">
        <Image
          className="absolute top-[28.5%] z-30 left-[12%] opacity-83 crown -rotate-[20deg]"
          src="/Crown.png"
          width={150}
          height={150}
          alt="crown"
        />
        <GSquare />
      </section>
      <section className="relative z-10 text-7xl h-full flex flex-col justify-center items-center text-center w-[40%]">
        <p className={pacifico.className}>
          Wish your friends or loved ones a Happy Birthday
        </p>
        <button
          className="mt-12 bg-purple-600 hover:animate-pulse hover:bg-purple-500 rounded-3xl text-2xl px-4 py-2"
          onClick={() => {
            router.push("/create_wish");
          }}
        >
          Create a Wish
        </button>
      </section>
      <section className="absolute h-screen w-screen overflow-hidden top-0 right-0 blur -z-0 opacity-50">
        <LandingBG />
      </section>
    </main>
  );
};

export default Home;
