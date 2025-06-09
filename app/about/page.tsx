import React from "react";

const page = () => {
  return (
    <div className="p-10 max-w-4xl mx-auto space-y-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold bg-gray-700 rounded p-2">
        About Easy Exhibitions
      </h1>
      <p>
        <strong>Easy Exhibitions</strong> is a platform designed to simplify the
        curation of art exhibitions. Our goal is to provide an intuitive and
        user-friendly interface for curators, artists, and art enthusiasts to
        explore, organize, and showcase collections of art, sculptures, and
        artifacts.
      </p>
      <h2 className="text-2xl font-semibold mt-6 bg-gray-700 rounded p-2">
        What You Can Do
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <ul>
            <strong>Browse museum collections freely:</strong>
            <li>
              Easy Exhibitions offers an expandable range of collections that
              users can explore, letting you view detailed information about
              each piece, including artist details, descriptions, and
              high-quality images.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <strong>Create and manage your own exhibitions:</strong>
            <li>
              Once registered, you can curate personalized exhibitions by saving
              your favourite artworks from the available collections.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <strong>Access Your Dashboard:</strong>
            <li>
              Each user has a dedicated dashboard to manage and revisit their
              exhibits and saved artworks.
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 bg-gray-700 rounded p-2">
        Technologies Used
      </h2>
      <p>
        Easy Exhibitions is built using modern web technologies to ensure a
        seamless user experience. The platform utilizes:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>React (With Typescript)</li>
        <li>Next.js</li>
        <li>Vercel</li>
        <li>PostgreSQL</li>
        <li>Tailwind CSS</li>
        <li>
          Flowbite.com - UI components, including:
          <ul className="list-disc pl-5">
            <li>Footer</li>
            <li>Pagination</li>
            <li>Sidebar</li>
          </ul>
        </li>
      </ul>
      <h3 className="text-xl font-semibold mt-6 bg-gray-700 rounded p-2">
        Want to provide feedback?
      </h3>
      <p>
        We value your feedback! If you have any suggestions or comments about
        the platform, please reach out to us through our{" "}
        <a
          href="https://github.com/tylerkade/exhibition-curation-platform"
          className="text-blue-500 underline"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
};

export default page;
