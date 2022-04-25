import React from "react";
import { Oval } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <Oval
          color="#1e293b"
          height={60}
          width={60}
          secondaryColor="#1e293b"
          strokeWidth={4}
        />
      </div>
    </div>
  );
};

export default Loader;
