import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { signOut, getTokenCheckAsync } from "../store/auth/authSlice";
import { resetAccounts } from "../store/accounts/accountsSlice";
import { tokenIsExpired } from "../helpers/utils";

const MenuNavbar = () => {
  const { signIn, user, statusTokenCode } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenIsExpired()) {
      signOutNow();
    } else {
      // @ts-ignore
      dispatch(getTokenCheckAsync());
    }
  }, []);

  useEffect(() => {
    if (!signIn) {
      navigate("/sign-in");
    }
  }, [signIn]);

  useEffect(() => {
    if (statusTokenCode === 401) {
      signOutNow();
    }
  }, [statusTokenCode]);

  const navigateTo = (address: string) => {
    navigate(`${address}`);
  };

  const signOutNow = () => {
    // @ts-ignore
    dispatch(signOut());
    // @ts-ignore
    dispatch(resetAccounts());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigateTo("/dashboard")}>
          Billeterapp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigateTo("/dashboard")}>
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => navigateTo("/create-account")}>
              Create Account
            </Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item>
                {user.name}
                <br />
                {user.username}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={signOutNow}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
