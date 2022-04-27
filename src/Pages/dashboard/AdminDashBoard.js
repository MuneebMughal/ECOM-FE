import React from "react";
import SideNav from "../../components/Nav/SideNav";
const AdminDashBoard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10">
          Admin DashBoard
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
