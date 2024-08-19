"use client";
import CountDown from "@/components/CountDown";
import { addMessage } from "@/lib/firebase/firestore";
import { Pacifico } from "next/font/google";
import { useEffect, useState } from "react";
import { Divide, LoaderCircle } from "lucide-react";
import BirthdayCake from "@/components/BirthdayCake";
import Image from "next/image";
import { upload } from "@/lib/firebase/storage";

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
interface Data {
  name: string;
  date: string;
  photoURL: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Data | null>(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/get_birthday?uid=${params.id}`);
      if (res.ok) {
        const dataa = await res.json();
        setData(dataa);
      } else {
        console.error("Failed to fetch user data");
      }
    };
    getData();
  }, []);
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await addMessage(params.id, name, message, photo);
    setLoading(false);
    if (res) {
      setSucess(true);
      setTimeout(() => setSucess(false), 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };
  return (
    <section
      className={`${pacifico.className} flex justify-center items-center h-[100vh] bg-gray-900`}
    >
      {(loading || !data) && (
        <div className="absolute">
          <BirthdayCake />
        </div>
      )}
      {sucess && (
        <div className="toast">
          <div className="alert bg-purple-600 flex justify-center ">
            <span>Message Submited Sucessfully</span>
          </div>
        </div>
      )}
      {error && (
        <div className="toast">
          <div className="alert bg-purple-600 flex justify-center ">
            <span>Error in submiting the Message</span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">{data?.name}&apos;s Birthday is in</h1>
        {data && (
          <Image
            className="rounded-full hover:opacity-80 bg-black"
            src={data.photoURL}
            width={100}
            height={100}
            alt="photo"
          ></Image>
        )}
        {data && <CountDown targetDate={data.date} />}
        <h1>Lets make {data?.name}&apos;s Birthday Special</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1>Write a Message for {data?.name}</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
          />
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            className="textarea textarea-bordered min-w-[20rem] min-h-[10rem] max-h-[10rem]"
            placeholder="Message"
          ></textarea>
          <label className="self-start" htmlFor="photo">
            Upload {data?.name}&apos;s Funny Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhoto}
            className="file-input w-full max-w-xs"
          />{" "}
          <button
            onClick={handleSubmit}
            className="btn bg-purple-600 hover:bg-purple-600"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
