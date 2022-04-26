import React from "react";
import {
  MdDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineCategory,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";
import { FaShuttleVan } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { AiOutlineGift } from "react-icons/ai";
import { IoAnalyticsSharp } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { VscReport } from "react-icons/vsc";
import "./Sidebar.css";
const Sidebar = (props) => {
  let selected = props.location.pathname;
  return (
    <div className="fixed w-2/12 h-full shadow-md bg-gray-100 first:pt-2 overflow-y-auto">
      <div className="flex flex-col last:mb-6">
        <Link to="/">
          <div
            className={`text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item ${
              selected === "/" ? "active shadow-md" : ""
            } border-myprimary`}
          >
            <div className="text-[20px] mt-0.5 mr-1">
              <MdDashboard />
            </div>
            <div className="text-[16px] md:!visible invisible">Dashboard</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <IoAnalyticsSharp />
            </div>
            <div className="text-[16px]">Analytics</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <HiOutlineDocumentReport />
            </div>
            <div className="text-[16px]">Reports</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <FiUsers />
            </div>
            <div className="text-[16px]">Users</div>
          </div>
        </Link>
        <Link to="/products">
          <div
            className={`text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2  side-item ${
              selected === "/products" ? "active shadow-md" : ""
            } border-myprimary`}
          >
            <div className="text-[20px] mt-0.5 mr-1">
              <MdOutlineProductionQuantityLimits />
            </div>
            <div className="text-[16px]">Products</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <MdOutlineCategory />
            </div>
            <div className="text-[16px]">Categories</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <BiDollar />
            </div>
            <div className="text-[16px]">Sales</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <BsBoxSeam />
            </div>
            <div className="text-[16px]">Orders</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <FaShuttleVan />
            </div>
            <div className="text-[16px]">Delievery</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <RiCoupon3Line />
            </div>
            <div className="text-[16px]">Coupons</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <AiOutlineGift />
            </div>
            <div className="text-[16px]">Offers</div>
          </div>
        </Link>
        <Link to="/">
          <div className=" text-myprimary hover:text-mysecondary hover:bg-myprimary transition duration-500 ease-in-out flex p-2 side-item border-myprimary ">
            <div className="text-[20px] mt-0.5 mr-1">
              <VscReport />
            </div>
            <div className="text-[16px]">Report Error</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
