import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <div className="flex justify-center">
          <Link href={"/"} className="flex justify-center items-center">
            <Image
              src="/Logo.png"
              width={475}
              height={229}
              alt="Easy Exhibitions Logo"
              className="mx-auto h-15 w-auto"
            />
          </Link>
        </div>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Browse collections of art, sculptures, and artifacts.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6">
              Premium
            </Link>
          </li>
          <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6 ">
              Campaigns
            </Link>
          </li>
          <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6">
              Blog
            </Link>
          </li>
          <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6">
              Affiliate Program
            </Link>
          </li>
          <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </Link>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <Link href="/" className="hover:underline">
            Easy Exhibitions
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
