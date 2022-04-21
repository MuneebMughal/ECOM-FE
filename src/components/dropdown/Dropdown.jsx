import React from "react";
import "./dropdown.css";
const Dropdown = ({ children, id }) => {
  return (
    <div
      className="absolute md:w-[180px] md:left-[-160px]  max-h-[210px] h-[300px] left-[-130px] w-[150px] top-[15px]    bg-white border-[2px] border-myprimary dd shadow-lg rounded-lg"
      id={id}
    >
      <div
        className="w-full h-full bg-white absolute rounded-md cursor-pointer overflow-auto"
        id={id}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
