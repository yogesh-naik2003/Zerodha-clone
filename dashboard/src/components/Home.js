import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import api from "../api";

const Home = () => {
  const loginUrl = process.env.REACT_APP_LOGIN_URL || "http://localhost:3000/login";
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState({ username: "", email: "" });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        window.location.href = loginUrl;
        return;
      }

      try {
        const { data } = await api.post("/");
        const { status, user: username, email } = data;

        if (status) {
          setUser({ username, email });
          toast(`Hello ${username}`, {
            position: "top-right",
          });
          setIsCheckingAuth(false);
          return;
        }
      } catch (error) {
        console.error(error);
      }

      removeCookie("token");
      window.location.href = loginUrl;
    };

    verifyCookie();
  }, [cookies, loginUrl, removeCookie]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error(error);
    }

    removeCookie("token");
    window.location.href = loginUrl;
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <>
      <TopBar user={user} onLogout={handleLogout} />
      <Dashboard />
      <ToastContainer />
    </>
  );
};

export default Home;
