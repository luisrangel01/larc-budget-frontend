import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { getSignUpAsync, resetSignUp } from "../store/auth/authSignUpSlice";

const SignUp = (props: any) => {
  const [key, setKey] = useState("home");
  const [dataSignUp, setDataSignUp] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { signUp } = useSelector((state: any) => state.authSignUp);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    // dispatch(getSignIn(dataSignIn));
    dispatch(getSignUpAsync(dataSignUp));
  };

  useEffect(() => {
    console.log(`signUp`, signUp);
    if (signUp) {
      // @ts-ignore
      dispatch(resetSignUp());
      console.log("redirect...");
      navigate("/sign-in");
    }
  }, [signUp]);

  const handleChange = (e: any) => {
    setDataSignUp({ ...dataSignUp, [e.target.name]: e.target.value });
  };

  const signIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={signIn}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={dataSignUp.name}
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={dataSignUp.email}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={dataSignUp.password}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
