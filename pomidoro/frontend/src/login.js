import React from "react";
import Configuration from "./extra/configuration";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;


    axios.post("http://localhost:8081/api/users/login", {
      email: email,
      password: password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    
      .then(response => {
        console.log(response);
      })
      .then(() => {
        
        axios.get("http://localhost:8081/api/users/id/" + email)
          .then(response => {
            const data = response.data;
            Cookies.set("token", data);
          })
          .catch(error => {
            console.error(error);
          });
    
        navigate("/timer", { replace: true });
      })
      .catch(error => {
        console.error(error);
      });
    
  };

  return (
    <div>
      <Configuration />
      <link rel="stylesheet" type="text/css" href="css/login.css" />
      <HelmetProvider>
        <Helmet>
          <title>{"Pomidoro | Login"}</title>
        </Helmet>
      </HelmetProvider>

      <div className="container">
        <div className="left-side">
          <div className="title">Pomidoro</div>
          <div className="logo-container">
            <img src="images/tomato.svg" alt="" id="tomato" crossOrigin="anonymous" />
            <img src="images/login_page/watch.svg" alt="" id="watch" crossOrigin="anonymous" />
          </div>
        </div>

        <div className="login-container">
          <form className="login" onSubmit={handleSubmit}>
            <div className="messages"></div>

            <input
              name="email"
              type="text"
              placeholder="Email@email.com"
              autoComplete="on"
            />
            <input name="password" type="password" placeholder="Haslo" autoComplete="on" />
            <button type="submit" title="zaloguj">
              Zaloguj
            </button>

            <p>
              Nie masz konta? <a href="registration" crossOrigin="anonymous">Zarejestruj</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
