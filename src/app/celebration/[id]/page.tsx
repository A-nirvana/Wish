"use client";
import CarouselDemo from "@/components/carouselComp";
import Image from "next/image";
import gsap from "gsap";
import { Pacifico, Oswald } from "next/font/google";
import { useEffect, useLayoutEffect, useState } from "react";
import "./styles.css";
import Confetti from "react-confetti";
import BirthdayCake from "@/components/BirthdayCake";
const pacifico = Pacifico({
    weight: "400",
    display: "swap",
    subsets: ["latin"],
});
const oswald = Oswald({
    weight: "400",
    display: "swap",
    subsets: ["latin"],
});

interface Birthday {
    name: string;
    photoURL: string;
    date: string;
    uid: string;
}

export default function Page({ params }: { params: { id: string } }) {
    const [birthday, setBirthday] = useState<Birthday | null>(null);
    const [messages, setMessages] = useState([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        const fetchBirthday = async () => {
            const res = await fetch(`/api/get_birthday?uid=${params.id}`);
            const data = await res.json();
            setBirthday(data);
        };
        const fetchMessages = async () => {
            const res = await fetch(`/api/messages?uid=${params.id}`);
            const data = await res.json();
            setMessages(data.messages);
        }
        fetchBirthday();
        fetchMessages();
    }, [params.id]);
    useLayoutEffect(() => {
        const audio = new Audio('/yay-6326.mp3');
        const bd = new Audio('/whistle.mp3');

        if (birthday?.name && isPlaying) {
            audio.play().catch(e => {
                console.log(e);
            });
            audio.addEventListener('ended', () => {
                bd.play().catch(e => {
                    console.log(e);
                });
            });
            gsap.to(".hbd", { y: -1000, delay: 2, duration: 1 });
            gsap.to(".mainsc", { zIndex: 10, delay: 3 });

            if (typeof window !== 'undefined') {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            }

            return () => {
                audio.pause();
                bd.pause();
            };
        }
    }, [birthday?.name, isPlaying]);

    if (!birthday) return <BirthdayCake button={true} handleClick={()=>{setIsPlaying(true)}}/>
    return (
        <main className="h-screen min-h-screen ">
            <Confetti width={width} height={height} numberOfPieces={400} recycle={false}
            />
            <section className="hbd absolute top-0 left-0 w-full h-full flex justify-center items-center start">
                <div className="text-center flex flex-col items-center">
                    <Image src={birthday.photoURL} alt="Birthday photo" height={300} width={300} className="rounded-full" />
                    <h1 className={pacifico.className + " text-7xl"}>Happy Birthday</h1>
                    <h2 className="text-5xl mt-8">{birthday.name}</h2>
                </div>
            </section>
            <section className="h-full flex flex-col items-center relative -z-50 mainsc">
                <div className={"mt-6 text-4xl text-center hed backdrop-blur-[1rem_0.5rem_0.5rem_#44aaff] " + pacifico.className}>
                    <p className="mb-2">Look!! your friends and family</p><p> have sent you wishes</p>
                </div>
                <CarouselDemo photo={true} data={messages} />
                <CarouselDemo data={messages} />
                <div className={"disco flex flex-col items-center " + oswald.className}>
                    <p>HAPPY</p>
                    <p>BIRTHDAY</p>
                </div>
                <div className={"absolute top-28 left-16 flex flex-col items-center drop-shadow-[-0.1rem_0.1rem_2rem_#ffaaff99]"}>
                    <Image src={birthday.photoURL} alt="Birthday photo" height={200} width={200} className="rounded-full" />
                    <Image
                        className="relative bottom-72 right-12 z-30 opacity-83 crown -rotate-[25deg]"
                        src="/Crown.png"
                        width={150}
                        height={150}
                        alt="crown"
                    />
                </div>
            </section>
        </main>
    );
}
