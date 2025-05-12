import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <Link href={"/"} className="flex justify-center items-center pt-4">
        <Image
          src="/Logo.png"
          width={475}
          height={229}
          alt="Easy Exhibitions"
          className="mx-auto h-25 w-auto"
          priority
        />
      </Link>
    </div>
  );
};

export default Header;
