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

  const router = useRouter();
  return (
    <main
      className={
        "h-screen flex justify-evenly overflow-hidden bg-gray-900 " +
        pacifico.className
      }
    >
      <section className="h-full flex justify-center items-center">
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
