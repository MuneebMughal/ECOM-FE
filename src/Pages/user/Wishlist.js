import React from "react";
import SideNav from "../../components/Nav/SideNav";
const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10">Wishlist</div>
      </div>
    </div>
  );
};

export default Wishlist;
