import React from "react";
import { MdDashboard } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
import { authConstants ,roles} from "../../actions/constants";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./userdropdown.css";
const UserDropDownMenu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      dispatch({
        type: authConstants.LOGOUT,
        payload: {},
      });
      window.localStorage.removeItem("authToken");
      history.push("/login");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
    props.onChange();
  };
  return (
    <div className={props.show ? "UDmenu active" : "UDmenu"}>
      <div className="UDmenu-name">{props.name}</div>
      <ul style={{ paddingLeft: "0.5rem" }}>
        <Link to={props.role === roles.ADMIN ? '/admin/dashboard' : '/user'} onClick={props.onChange}>
          <li className="UDmenu-item">
            <MdDashboard style={{ marginRight: "5px" }} /> Dashboad
          </li>
        </Link>
        <Link to='/password' onClick={props.onChange}>
        <li className="UDmenu-item">
          <RiLockPasswordFill style={{ marginRight: "5px" }} /> Change Password
        </li>
        </Link>
        <Link to="/login" onClick={logout}>
          <li className="UDmenu-item">
            <CgLogOut style={{ marginRight: "5px" }} /> Sign Out
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default UserDropDownMenu;
