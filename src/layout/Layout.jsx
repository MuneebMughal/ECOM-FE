import React from "react";
import Navbar from "../components/Nav/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div className="relative w-full h-[1000px] flex flex-row">
        <div className="w-2/12">
          <Sidebar {...props}/>
        </div>
        <div className="w-10/12 h-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
