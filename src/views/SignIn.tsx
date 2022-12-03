import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSignInAsync, resetSignInError } from "../store/auth/authSlice";
import WarningMessage from "../components/WarningMessage";
import { Spinner } from "react-bootstrap";

const { REACT_APP_API_URL } = process.env;

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const { signIn, status, statusCode, message } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(getSignInAsync(dataSignIn));
  };

  useEffect(() => {
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  }, []);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  useEffect(() => {
    if (signIn) {
      navigate("/dashboard");
    }
  }, [signIn]);

  useEffect(() => {
    if (statusCode) {
      if (statusCode !== 201) {
        setShowMessage(true);
        // @ts-ignore
        dispatch(resetSignInError());
      }
    }
  }, [statusCode]);

  const handleChange = (e: any) => {
    setDataSignIn({ ...dataSignIn, [e.target.name]: e.target.value });
  };

  const signUp = () => {
    navigate("/sign-up");
  };

  const toggleShowMessage = () => setShowMessage(!showMessage);

  return (
    <div className="Auth-form-container">
      <form className="General-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          {loading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

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

          <WarningMessage
            showMessage={showMessage}
            toggleShowMessage={toggleShowMessage}
            title="Sign In"
            message={message}
          />

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
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
