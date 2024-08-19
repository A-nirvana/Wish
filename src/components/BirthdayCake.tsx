import React from "react";

import Image from "next/image";
export default function BirthdayCake() {
  return (
    <div className="h-[100vh] w-[100vw] backdrop-blur-md flex items-center justify-center bg-[#000000aa]">
      <Image
        className="animate-bounce"
        src="/birthday-cake-svgrepo-com (1).svg"
        height={50}
        width={50}
        alt="cake"
      />
    </div>
  );
}
