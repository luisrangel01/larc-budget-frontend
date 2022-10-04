import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "./../store/authSlice";

const Navbar = () => {
  const { login } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    console.log(`login`, login);
    if (!login) {
      console.log("redirect...");
      navigate("/login");
      // redirect(`/dashboard`);
    }
  }, [login]);

  const home = () => {
    navigate("/home");
  };

  const logout = () => {
    // @ts-ignore
    dispatch(logOut());
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Link to="/home">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">login</Link>
      <button onClick={home}>Home</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Navbar;
