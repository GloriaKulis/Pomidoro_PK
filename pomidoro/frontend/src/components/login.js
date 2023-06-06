import React from 'react';
import Configuration from './extra/configuration';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { loginUser, setCookieAndNavigate } from '../actions/fetchData';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  localStorage.clear();
  Cookies.remove('token');
  const handleSubmit = (event) => {

    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    loginUser(email, password);
    setCookieAndNavigate(email, navigate);
  };

  return (
    <div>
      <Configuration />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="stylesheet" type="text/css" href="css/login.css" />
      <HelmetProvider>
        <Helmet>
          <title>{"Pomidoro | Login"}</title>
        </Helmet>
      </HelmetProvider>

      <div className="container">
        {/* Left Side */}
        <div className="left-side">
          <div className="title">Pomidoro</div>
          <div className="logo-container">
            <img src="images/tomato.svg" alt="" id="tomato" crossOrigin="anonymous" />
            <img src="images/login_page/watch.svg" alt="" id="watch" crossOrigin="anonymous" />
          </div>
        </div>

        {/* Login Form */}
        <div className="login-container">
          <form className="login" onSubmit={handleSubmit}>
            <div className="messages"></div>

            <input
              name="email"
              type="text"
              placeholder="Email@example.com"
              autoComplete="on"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
            <button type="submit" title="Zaloguj">
              Zaloguj
            </button>

            <p>
              Nie masz konta? <a href="registration">Zarejestruj</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
