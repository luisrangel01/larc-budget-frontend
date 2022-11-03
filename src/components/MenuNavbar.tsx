import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { signOut } from "../store/authSlice";

const MenuNavbar = () => {
  const { signIn, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`sign in`, signIn);
    if (!signIn) {
      console.log("redirect from MenuNavbar...");
      navigate("/sign-in");
      // redirect(`/dashboard`);
    }
  }, [signIn]);

  const home = () => {
    navigate("/home");
  };

  const signOutNow = () => {
    // @ts-ignore
    dispatch(signOut());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="home">Billeterapp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="home">Homex</Nav.Link>
            <Nav.Link href="dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                {user.name}
                <br />
                {user.username}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              <NavDropdown.Item onClick={home}>Home</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" onClick={signOutNow}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
