import React, { useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  useEffect(() => {
    const setActiveItem = (e) => {
      if (e.target.classList.contains("side-item")) {
        const sideItems = document.querySelectorAll(".side-item");
        if (sideItems && sideItems.length > 0) {
          sideItems.forEach((Item) => Item.classList.remove("active"));
        }
        e.target.classList.add("active");
      }
    };
    window.addEventListener("click", setActiveItem);
    return () => window.removeEventListener("click", setActiveItem);
  }, []);
  return (
    <div className="fixed w-2/12 h-full shadow-md bg-gray-100 first:pt-2 ">
      <div className="flex flex-col">
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item active border-myprimary">
            <div className="text-[20px] mt-0.5 mr-1">
              <MdDashboard />
            </div>
            <div className="text-[18px]">Dashboard</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary">
            <div className="text-[20px] mt-0.5 mr-1">
              <MdDashboard />
            </div>
            <div className="text-[18px]">Dashboard</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
