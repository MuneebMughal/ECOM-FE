import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { roles } from "../../actions/constants";
const renderUserNav = () => {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user" className="nav-link">
          User
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/password" className="nav-link">
          Password
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/wishlist" className="nav-link">
          Wishlist
        </Link>
      </li>
    </ul>
  );
};
const renderAdminNav = () => {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/password" className="nav-link">
          Password
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Products
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Categories
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/sub-category" className="nav-link">
          Sub Categories
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/password" className="nav-link">
          Coupons
        </Link>
      </li>
    </ul>
  );
};
const SideNav = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav>
      {user.role === roles.SUBSCRIBER ? renderUserNav() : renderAdminNav()}
    </nav>
  );
};

export default SideNav;
