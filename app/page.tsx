import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CollectionsButton } from "./ui/CollectionsButton";

const partneredAPIs = [
  { logo: "/MET.svg", link: "https://metmuseum.github.io/" },
  { logo: "/ARTIC.svg", link: "https://api.artic.edu/docs/" },
];

const dummyData = [
  { title: "Gothic Interiors", amount: 5, image: "/gothicInteriors.jpg" },
  {
    title: "Self Portraits",
    amount: 10,
    image: "/selfPortrait.jpg",
  },
  { title: "Natural Beauty", amount: 7, image: "/naturalBeauty.jpg" },
];

export default async function Page() {
  return (
    <div className="space-y-20">
      <section className="relative bg-gray-700 min-h-screen flex flex-col justify-center items-center text-center px-6">
        <div className="absolute inset-0">
          <Image
            src="/heroBanner.jpg"
            alt="Art collage banner"
            style={{ objectFit: "cover" }}
            fill
            className="opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Discover. Curate. Exhibit.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Browse iconic artworks from global collections and create your own
            curated exhibitions.
          </p>
          <div className="flex justify-center space-x-4">
            <CollectionsButton btnMsg={"Start Exploring"} nav={"/collections"}/>
            <Link href={`/login`}>
              <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Your Exhibition
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-4">Your Curated Space</h2>
        <div className="text-gray-400 mb-10">
          <p>
            Browse our wide selection of artworks, and personalise your own
            digital exhibitions.
          </p>
          <p>Collect, organize, and share your vision with the world.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dummyData.map((exhibit, index) => (
            <div key={index} className="rounded-2xl overflow-hidden">
              <Image
                src={exhibit.image}
                alt={exhibit.title}
                width={400}
                height={250}
                className="w-full object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold">{exhibit.title}</h3>
                <p className="text-sm text-gray-500">
                  {exhibit.amount} artworks
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-600 px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Powered by Open Commons
          </h2>
          <p className="text-gray-300 mb-8">
            We connect with museum collections through public APIs, bringing you
            authentic art at a moments notice.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 items-center justify-center">
            {partneredAPIs.map((api, index) => (
              <div key={index} className="flex justify-center">
                <a href={api.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={api.logo}
                    alt={`Partner ${index}`}
                    width={120}
                    height={120}
                    style={{ height: "auto" }}
                    className="mx-auto grayscale hover:grayscale-0 transition"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
