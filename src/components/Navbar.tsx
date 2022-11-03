import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "./../store/authSlice";

const Navbar = () => {
  const {  signIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    console.log(`sign in`, signIn);
    if (!signIn) {
      console.log("redirect...");
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Link to="/home">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/sign-in">Sign In</Link>
      <button onClick={home}>Home</button>
      <button onClick={signOutNow}>Sign Out</button>
    </div>
  );
};

export default Navbar;
