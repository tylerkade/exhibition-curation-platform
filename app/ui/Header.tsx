import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="relative justify-center py-10 bg-gray-800" role="banner">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
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
    </header>
  );
};

export default Header;
