// "use client";
// import React from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const perLimitOptions = [12, 24, 48, 96];

// const PageLimit = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const initial = parseInt(searchParams.get("pageLimit") || "12", 10);
//   const [pageLimit, setPageLimit] = useState(initial);

//   useEffect(() => {
//     const current = new URLSearchParams(window.location.search);
//     current.set("pageLimit", pageLimit.toString());
//     const newUrl = `${window.location.pathname}?${current.toString()}`;
//     router.replace(newUrl);
//   }, [pageLimit]);

//   return (
//     <select
//       value={pageLimit}
//       onChange={(e) => setPageLimit(parseInt(e.target.value))}
//       className="border rounded-md px-2 py-1 text-sm dark:bg-gray-800 dark:text-white"
//     >
//       {perLimitOptions.map((option) => (
//         <option key={option} value={option}>
//           {option} / page
//         </option>
//       ))}
//     </select>
//   );
// };

// export default PageLimit;
