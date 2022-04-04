import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Header.css";
import { FiLogIn } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import UserDropDownMenu from "../dropdown/UserDropDownMenu";
const Header = () => {
  const auth = useSelector((state) => state.user);
  const [showUD, setUD] = useState(false);
  const toggleUserDropDown = () => {
    setUD(!showUD);
  };
  return (
    <Navbar
      bg="dark"
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "darkblue" }}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: 'white' }}>Muneeb Mart</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
            {auth.isLoggedIn ? (
              <div style={{ position: "absolute", top: "25%" }}>
                <div className="d-flex justify-content-end">
                  <FaUserAlt
                    style={{
                      fontSize: "1.5rem",
                      color: "rgba(255,255,255,.55)",
                      marginRight: "2rem",
                      cursor: "pointer",
                    }}
                    onClick={toggleUserDropDown}
                  />
                </div>

                <UserDropDownMenu
                  name={auth.name}
                  show={showUD}
                  onChange={() => {
                    setUD(false);
                  }}
                  role={auth.role}
                />
              </div>
            ) : (
              <div className="d-flex">
                <div style={{ marginRight: "1rem" }}>
                  <Link to="/login" style={{ color: "rgba(255,255,255,.55)" }}>
                    Login <FiLogIn />
                  </Link>
                </div>
                <div>
                  <Link
                    to="/register"
                    style={{ color: "rgba(255,255,255,.55)" }}
                  >
                    Register <FaRegAddressBook />
                  </Link>
                </div>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
