// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect } from "react";

// import { fetchArtworkById, fetchArtworkIDs } from "../lib/endpoints";

// const MainPage = (
//   artworks,
//   setArtworks,
//   setLoading: { artworks: any[]; setArtworks: any[]; setLoading: boolean }
// ) => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ids = await fetchArtworkIDs(0, 55);

//         const artworksData = await Promise.all(
//           ids.map(async (id: number) => {
//             const data = await fetchArtworkById(id);
//             return data;
//           })
//         );
//         setArtworks(artworksData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching artowrks: ", error);
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
//       <h1>Main</h1>
//       <Link href="/items">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           items
//         </button>
//       </Link>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
//         {artworks.map((art) => (
//           <div key={art.objectID} className="border p-2 rounded">
//             <h3 className="font-medium text-sm mb-1">{art.title}</h3>
//             {art.primaryImageSmall ? (
//               <Image
//                 src={art.primaryImageSmall}
//                 alt={art.title}
//                 width={300}
//                 height={300}
//                 className="object-cover"
//               />
//             ) : (
//               <p className="text-xs text-gray-500">No image available</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainPage;
