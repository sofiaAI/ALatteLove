import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user) {
        // they are registed in the database, and currently logged in.
        setUser(user);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUser(user);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUser(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Router>
        <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} user={user} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
