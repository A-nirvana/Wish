"use client";
import CountDown from "@/components/CountDown";
import { Pacifico } from "next/font/google";
import { useState } from "react";
const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
interface Data {
  name: string;
  date: string;
}
export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Data | null>({
    name: "Lorem",
    date: "2024-08-25",
  });
  //TODO: Fetch the data of the birthday boy/girl/....

  return (
    <section
      className={`${pacifico.className} flex justify-center items-center h-[100vh] bg-gray-900`}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">{data?.name}&apos;s Birthday is in</h1>
        {data && <CountDown targetDate={data.date} />}
        <h1>Lets make {data?.name}&apos;s Birthday Special</h1>
        <div className="flex flex-col items-center gap-4">
          <h1>Write a Message for {data?.name}</h1>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
          />
          <textarea
            className="textarea textarea-bordered min-w-[20rem]"
            placeholder="Message"
          ></textarea>
        </div>
      </div>
    </section>
  );
}
