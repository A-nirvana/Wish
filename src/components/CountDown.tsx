"use client";
import { Pacifico } from "next/font/google";
import { useEffect, useState } from "react";

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
interface InputProps {
  targetDate: string;
}
interface BlockProps {
  value: number;
  unit: string;
}

function Block(data: BlockProps) {
  return (
    <div className={`${pacifico.className} p-2 flex flex-col items-center`}>
      <span className="text-4xl">{String(data.value).padStart(2, "0")}</span>
      <span>{data.unit}</span>
    </div>
  );
}
export default function CountDown(targetDate: InputProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const target = new Date(`${targetDate.targetDate}T00:00:00+05:30`);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };
  setInterval(calculateTimeRemaining, 1000);

  return (
    <div>
      <div className="flex">
        <Block value={timeRemaining.days} unit="Days" />
        <Block value={timeRemaining.hours} unit="Hours" />
        <Block value={timeRemaining.minutes} unit="Minutes" />
        <Block value={timeRemaining.seconds} unit="Seconds" />
      </div>
    </div>
  );
}
