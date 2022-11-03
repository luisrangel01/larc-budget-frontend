import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { getSignIn, signOut, getSignInAsync } from "./../store/authSlice";
import { signOut, getSignInAsync } from "../store/authSlice";

const SignIn = () => {
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handelSubmit = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    // dispatch(getSignIn(dataSignIn));

    dispatch(getSignInAsync(dataSignIn));
  };

  useEffect(() => {
    console.log(`signIn`, signIn);
    if (signIn) {
      console.log("redirect...");
      navigate("/dashboard");
      // redirect(`/dashboard`);
    }
  }, [signIn]);

  const handelChange = (e: any) => {
    setDataSignIn({ ...dataSignIn, [e.target.name]: e.target.value });
  };

  const signUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handelSubmit}>
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
              onChange={handelChange}
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
              onChange={handelChange}
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

  return (
    <div>
      {!signIn ? (
        <form onSubmit={handelSubmit}>
          <input
            placeholder="email"
            name="email"
            onChange={handelChange}
            value={dataSignIn.email}
          />
          <input
            placeholder="password"
            name="password"
            onChange={handelChange}
            value={dataSignIn.password}
          />
          <button type="submit">Sign In</button>
          <button onClick={signUp}>Sign Up</button>
        </form>
      ) : (
        <button
          onClick={() => {
            // @ts-ignore
            dispatch(signOut());
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default SignIn;