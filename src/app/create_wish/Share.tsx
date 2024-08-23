"use client";
import { Copy, Share2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
interface props {
  uid: string;
}

export default function Share(props: props) {
  const baseURL = `${window.location.protocol}//${window.location.host}/`;
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const celebPageURL = baseURL + "celebration/" + props.uid;
  const addMsgPageURL = baseURL + "add_message/" + props.uid;
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      },
      () => {}
    );
  };
  return (
    <section className="absolute h-[100vh] w-[100vw]">
      {isCopied && (
        <div className="toast">
          <div className="alert bg-purple-600 flex justify-center ">
            <span>Link Copied</span>
          </div>
        </div>
      )}
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#00000073] backdrop-blur-2xl rounded-lg p-10">
        <div className="flex flex-col items-center justify-between gap-2">
          <h1 className="text-lg font-semibold">
            Share to Add other friends wishes
          </h1>
          <div className="flex items-center justify-center gap-2">
            <p className="inline max-w-[20rem] p-2.5 truncate bg-gray-800 rounded-lg">
              {addMsgPageURL}
            </p>
            <button
              className="btn p-2  bg-gray-800 hover:bg-purple-600"
              onClick={() => copyToClipboard(addMsgPageURL)}
            >
              {" "}
              <Copy />
              {}
            </button>
            <button className="btn bg-gray-800 hover:bg-gray-800 p-2 min-h-0">
              <Share2 />
              {}
            </button>
          </div>
          <button
            onClick={() => router.push(addMsgPageURL)}
            className="btn bg-purple-600 hover:bg-purple-600"
          >
            View Page
          </button>
          <h1 className="text-lg font-semibold">Preview the Main Page</h1>
          <div className="flex items-center justify-center gap-2">
            <p className="inline max-w-[20rem] p-2.5 truncate bg-gray-800 rounded-lg">
              {celebPageURL}
            </p>
            <button
              className="btn p-2  bg-gray-800 hover:bg-purple-600"
              onClick={() => copyToClipboard(celebPageURL)}
            >
              <Copy />
              {}
            </button>
            <button className="btn p-2 bg-gray-800 hover:bg-gray-800">
              <Share2 />
              {}
            </button>
          </div>
          <button
            onClick={() => router.push(celebPageURL)}
            className="btn bg-purple-600 hover:bg-purple-600"
          >
            View Page
          </button>
        </div>
      </div>
    </section>
  );
}
