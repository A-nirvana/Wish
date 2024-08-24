import React from "react";
import Image from "next/image";

interface BirthdayCakeProps {
  button? : boolean,
  handleClick?:()=>void
}
const BirthdayCake:React.FC<BirthdayCakeProps> = ({button, handleClick}) => {
  return (
    <div className="h-[100vh] w-[100vw] backdrop-blur-md flex flex-col items-center justify-center bg-[#000000aa]">
      <Image
        className="animate-bounce"
        src="/birthday-cake-svgrepo-com (1).svg"
        height={50}
        width={50}
        alt="cake"
      />
      {button && <button className="bg-transparent text-[#fff] p-2 rounded-md" onClick={handleClick}>Click me</button>}
    </div>
  );
}

export default BirthdayCake;
