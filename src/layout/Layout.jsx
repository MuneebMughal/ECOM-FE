import React, { useState } from "react";
import Navbar from "../components/Nav/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = ({ children }) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show ? <Navbar /> : ""}

      <div className="relative w-full h-[1000px] flex flex-row">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12 h-full">
          <button onClick={() => setShow(!show)}>Click me to Learn</button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
