import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFingerprint,
  faHouse,
  faPhone,
  faPowerOff,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const navigate = useNavigate();
  const loginToken = localStorage.getItem("token");

  const logoutFunction = () => {
    localStorage.clear();
  };
  return (
    <Navbar expand="lg" className="navbar">
      <Container className="navbar-container">
        <Navbar.Brand>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} /> ACS assignment
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!loginToken ? (
              <>
                <Link to="/about">
                  <FontAwesomeIcon icon={faUsers} /> About Us
                </Link>
                <Link to="/contact">
                  <FontAwesomeIcon icon={faPhone} /> Contact Us
                </Link>
                <Link to="/register">
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                </Link>
                <Link to="/login">
                  <FontAwesomeIcon icon={faFingerprint} /> Login
                </Link>
              </>
            ) : (
              <Link to="/login" onClick={logoutFunction}>
                <FontAwesomeIcon icon={faPowerOff} />
                Logout
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
