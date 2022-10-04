import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getLogin } from "../../store/authSlice";
import Navbar from "../../components/Navbar";
import RouteProtector from "../../components/RouteProtector";
import Home from "../../views/Home";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import Login from "../../views/Login";

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
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
  );
}

export default App;
