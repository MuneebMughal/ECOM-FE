import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Header.css";
import { FiLogIn } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import { authConstants } from "../../actions/constants";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Header = () => {
  const auth = useSelector((state) => state.user);
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
  };
  return (
    <Navbar
      bg="dark"
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "darkblue" }}
    >
      <Container>
        <Navbar.Brand href="/">Muneeb Mart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
            <div className="link">
              <Link to="/login" style={{ color: "rgba(255,255,255,.55)" }}>
                Login <FiLogIn />
              </Link>
            </div>

            {auth.isLoggedIn ? (
              <div className="link" onClick={logout}>
                <Link to="/login" style={{ color: "rgba(255,255,255,.55)" }}>
                  Logout <FiLogIn />
                </Link>
              </div>
            ) : (
              <div className="link">
                <Link to="/register" style={{ color: "rgba(255,255,255,.55)" }}>
                  Register <FaRegAddressBook />
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
