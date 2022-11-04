import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"

// import { getSignIn } from "../../store/authSlice";
import MenuNavbar from "../MenuNavbar";
import RouteProtector from "../../components/RouteProtector";
import Home from "../../views/Home";
import Dashboard from "../../views/Dashboard";
import CreateAccount from "../../views/CreateAccount";
import NotFound from "../../views/NotFound";
import SignIn from "../../views/SignIn";
import SignUp from "../../views/SignUp";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  /*
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      //dispatch(getSignIn(user))
    }
  }, [])*/
  return (
    <div className="App">
      <BrowserRouter>
        {/* <MenuNavbar /> */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={
              <RouteProtector>
                <Home />
              </RouteProtector>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <RouteProtector>
                <Home />
              </RouteProtector>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RouteProtector>
                <Dashboard />
              </RouteProtector>
            }
          />
          <Route
            path="/create-account"
            element={
              <RouteProtector>
                <CreateAccount />
              </RouteProtector>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
