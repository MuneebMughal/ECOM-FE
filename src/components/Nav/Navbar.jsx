import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { HiOutlineMail, HiMenu } from "react-icons/hi";
import { BiStore } from "react-icons/bi";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import Dropdown from "../dropdown/Dropdown";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import { RiLockPasswordLine, RiSearchLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { authConstants } from "../../actions/constants";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showProfileDrop, setShowProfileDrop] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const hidedropdown = (e) => {
      const parentdd = document.getElementById("dduserparent");
      if (parentdd && !parentdd.contains(e.target)) {
        setShowProfileDrop(false);
      }
    };
    window.addEventListener("click", hidedropdown);
    return () => {
      window.removeEventListener("click", hidedropdown);
    };
  }, []);
  const logout = () => {
    dispatch({
      type: authConstants.LOGOUT,
    });
    localStorage.clear();
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <nav className="w-full sticky top-0 left-0 bg-myprimary z-[999]">
      <div className="flex justify-between text-mysecondary shadow-md">
        <div className="text-base md:hidden visible w-1/5 sm:w-1/3">
          <div
            className="text-2xl p-2 ml-4 mt-1 w-max"
            onClick={() => setShow(!show)}
          >
            {show ? <FaTimes /> : <HiMenu />}
          </div>
        </div>
        <div className="text-base w-1/3 sm:w-2/5 ">
          <Link
            to="/"
            className="hover:text-mysecondary flex md:w-max w-full md:justify-start justify-center lg:text-2xl md:text-xl text-lg font-bold font-roboto-600 "
          >
            <div className="p-2  md:ml-10 w-max whitespace-nowrap">
              Some Mart
            </div>
            <div className="p-1 mt-2">
              <BiStore />
            </div>
          </Link>
        </div>
        <div className="md:flex hidden w-1/3 items-center justify-center">
          <div className="flex w-full relative bg-mysecondary rounded-xl">
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none text-myprimary w-5/6 p-1 rounded-2xl"
              value={search}
              onChange={handleSearch}
            />
            <div className="w-1/6  text-myprimary text-[24px] cursor-pointer border-mysecondary flex justify-end">
              <RiSearchLine className="mt-1 mr-1" />
            </div>
          </div>
        </div>
        <div className="flex justify-end flex-row w-1/3 sm:w-2/5 items-center">
          <div className="md:px-3 px-2 text-mysecondary text-2xl cursor-pointer relative w-min">
            <div
              className="absolute right-1  h-4 w-4 bg-red-600 rounded-lg flex justify-center items-center"
              style={{ top: "-4px" }}
            >
              <div className="text-xs text-mysecondary">1</div>
            </div>
            <IoMdNotifications />
          </div>
          <div className="md:px-3 px-2 text-mysecondary text-2xl cursor-pointer relative w-min">
            <div
              className="absolute right-1 h-4 w-4 bg-red-600 rounded-lg flex justify-center items-center"
              style={{ top: "-4px" }}
            >
              <div
                className="text-xs text-mysecondary"
                style={{ fontSize: "9px", letterSpacing: "0px" }}
              >
                9+
              </div>
            </div>
            <HiOutlineMail />
          </div>
          <div
            style={{
              minWidth: "30px",
              minHeight: "30px",
            }}
            className=" md:mr-8 mr-2 md:w-10 w-8 md:h-10 h-8 relative cursor-pointer md:ml-2"
          >
            <div
              className="w-full h-full flex flex-col justify-center items-center text-[30px] text-mysecondary"
              onClick={() => setShowProfileDrop(!showProfileDrop)}
              id="dduserparent"
            >
              <FaUserCircle />
              <div className="relative">
                <div
                  className={`transition-all duration-200 z-10  ${
                    showProfileDrop
                      ? "opacity-100  visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <Dropdown id="dduser">
                    <div className="w-full flex flex-col ">
                      <div className="text-base flex justify-center p-2 font-bold text-myprimary border-myprimary border-b-2">
                        Muneeb
                      </div>
                      <Link to="/">
                        <div className="flex text-myprimary text-[18px] py-[7px] pl-[5px] hover:bg-myprimary hover:text-mysecondary">
                          <div className="mt-[4px] mr-[5px]">
                            <CgProfile />
                          </div>
                          <div>Profile</div>
                        </div>
                      </Link>
                      <Link to="/">
                        <div className="flex text-myprimary text-[18px] py-[7px] pl-[5px] hover:bg-myprimary hover:text-mysecondary">
                          <div className="mt-[4px] mr-[5px]">
                            <AiOutlineSetting />
                          </div>
                          <div>Settings</div>
                        </div>
                      </Link>
                      <Link to="/">
                        <div className="flex text-myprimary text-[18px] py-[7px] pl-[5px] hover:bg-myprimary hover:text-mysecondary">
                          <div className="mt-[4px] mr-[5px]">
                            <RiLockPasswordLine />
                          </div>
                          <div>Password</div>
                        </div>
                      </Link>
                      <Link to="/" onClick={logout}>
                        <div className="flex text-myprimary text-[18px] py-[7px] pl-[5px] hover:bg-myprimary hover:text-mysecondary">
                          <div className="mt-[4px] mr-[5px]">
                            <VscSignOut />
                          </div>
                          <div>Sign Out</div>
                        </div>
                      </Link>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative ">
        <div
          className={`bg-myprimary/[0.5] absolute w-full border-y-2 md:hidden transition-all duration-500 ease-in-out top-0 ${
            show ? "visible z-20 left-0 opacity-100" : "left-[-770px] opacity-0"
          }`}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
