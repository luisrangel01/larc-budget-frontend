import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSignInAsync } from "../store/auth/authSlice";

const SignIn = () => {
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(getSignInAsync(dataSignIn));
  };

  useEffect(() => {
    if (signIn) {
      navigate("/dashboard");
    }
  }, [signIn]);

  const handleChange = (e: any) => {
    setDataSignIn({ ...dataSignIn, [e.target.name]: e.target.value });
  };

  const signUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={signUp}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={dataSignIn.email}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={dataSignIn.password}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Sign In
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

export default SignIn;
