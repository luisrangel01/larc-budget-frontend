import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { getLogin, logOut, getLoginAsync } from "./../store/authSlice";
import { logOut, getLoginAsync } from "./../store/authSlice";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const { login } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handelSubmit = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    // dispatch(getLogin(dataLogin));

    dispatch(getLoginAsync(dataLogin));
  };

  useEffect(() => {
    console.log(`login`, login);
    if (login) {
      console.log("redirect...");
      navigate("/dashboard");
      // redirect(`/dashboard`);
    }
  }, [login]);

  const handelChange = (e: any) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };

  const signUp = () => {
    navigate("/sign-up");
  };

  return (
    <div>
      {!login ? (
        <form onSubmit={handelSubmit}>
          <input
            placeholder="email"
            name="email"
            onChange={handelChange}
            value={dataLogin.email}
          />
          <input
            placeholder="password"
            name="password"
            onChange={handelChange}
            value={dataLogin.password}
          />
          <button type="submit">login</button>
          <button onClick={signUp}>Sign Up</button>
        </form>
        
      ) : (
        <button
          onClick={() => {
            // @ts-ignore
            dispatch(logOut());
          }}
        >
          LogOut
        </button>
      )}
    </div>
  );
};

export default Login;
