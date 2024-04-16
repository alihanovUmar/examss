import React, { useState, useEffect } from "react";
import { Adminka } from "../Adminka/Adminka";
import loginImg from "../../../assets/images/login.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("tok  en") || "");
  const [loginStatus, setLoginStatus] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token); 
          setLoginStatus("Login");
        } else {
          setLoginStatus("Token");
        }
      } else {
        setLoginStatus(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginStatus("error");
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); 
    }
  }, [token]);

  if (token) {
    return <Adminka />;
  }

  return (
    <>
      <section className="login">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <div className="login__wrapper">
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">send</button>
              <h2>mor_2314</h2>
              <h2>83r5^_</h2>
            </div>
          </form>
          {loginStatus && <p>{loginStatus}</p>}
          <img className="login__img" src={loginImg} alt="login img" />
        </div>
      </section>
    </>
  );
};

export default Login;
