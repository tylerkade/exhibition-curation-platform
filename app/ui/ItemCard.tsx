import Image from "next/image";
import React from "react";

const itemCard = ({ object }: any) => {
  return (
    <div>
      <h1>{object.objectName}</h1>
      <h2>Department: {object.department}</h2>
      <Image
        src={object.primaryImage}
        alt={`image of ${object.objectName}`}
        width="0"
        height="0"
        sizes="100vw"
        className="w-[200px] h-auto"
      ></Image>
    </div>
  );
};

export default itemCard;
