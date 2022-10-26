import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"

import { getLogin } from "../../store/authSlice";
import Navbar from "../../components/Navbar";
import RouteProtector from "../../components/RouteProtector";
import Home from "../../views/Home";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import Login from "../../views/Login";
import SignUp from "../../views/SignUp";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  /*
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      //dispatch(getLogin(user))
    }
  }, [])*/
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
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
          <Route path="/login" element={<Login />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
