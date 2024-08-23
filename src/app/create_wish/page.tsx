"use client";
import { Pacifico } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
import CountDown from "@/components/CountDown";
import { setBirthDay } from "@/lib/firebase/firestore";
import Share from "./Share";
import BirthdayCake from "@/components/BirthdayCake";
import { Divide } from "lucide-react";
import Confetti from "react-confetti";

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

interface Photo {
  file: File | null;
  url: string;
}

export default function Page() {
  const [name, setName] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<Photo>({
    file: null,
    url: "https://firebasestorage.googleapis.com/v0/b/wish-dd104.appspot.com/o/HAPPY_BD_KID.jpeg?alt=media&token=c290fd65-266b-4d17-b8a9-7edd70b1d780",
  });
  const [uid, setUID] = useState("");
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async () => {
    if (date) {
      setLoading(true);
      const res = await setBirthDay(name, date, photo.file);
      setUID(res);
      setLoading(false);
    }
  };
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  }, []);

  return (
    <section className="flex justify-center items-center h-[100vh] w-[100vw] bg-gray-900">
      {click && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          recycle={false}
        />
      )}
  if (typeof window !== "undefined") {

    
    return (
      <section className="flex justify-center items-center h-[100vh] w-[100vw] bg-gray-900">
      {uid && <Share uid={uid} />}
      {loading && (
        <div className="absolute">
          <BirthdayCake />
        </div>
      )}
      <div className="">
        <div className="flex flex-col justify-center gap-4">
          <h1 className={`${pacifico.className} text-2xl`}>
            Create a Birthday Surprise
          </h1>
          <label className="flex flex-col items-center " htmlFor="photo">
            <Image
              className="rounded-full hover:opacity-80 bg-black"
              src={photo.url}
              width={100}
              height={100}
              alt="photo"
              ></Image>
            <input
              type="file"
              accept="image/*"
              id="photo"
              className="hidden"
              onChange={handlePhoto}                
              />
            {}
            Add Photo
          </label>
          <input
            type="text"
            placeholder="Name or Nick Name"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setName(e.target.value)}
            />
          <input
            type="date"
            onChange={handleDateChange}
            className="input input-bordered w-full max-w-xs"
            />
          <button
            onClick={() => {
              handleSubmit();
              setClick(true);
              setTimeout(() => {
                setClick(false);
              }, 5000);
            }}
            className="btn bg-purple-600 hover:animate-pulse hover:bg-purple-600 "
            >
            Create
          </button>
          {date && <CountDown targetDate={date} />}
        </div>
      </div>
      {!uid && !loading && (
        <div className="absolute top-[23%] md:top-[13%]">
          <Image
            src="/balloon-3945_256.gif"
            height={110}
            width={110}
            alt="ballon"
          />
        </div>
      )}
      <div className="absolute top-[100%] translate-y-[-100%] p-1 box-border flex wrap overflow-hidden">
        {/* {Array.from({ length: 7 }, (_, i) => (
          <Image
            src="/ballon.png"
            height={50}
            width={50}
            alt="ballon"
          />
        ))} */}
      </div>
    </section>
  );
}
}
