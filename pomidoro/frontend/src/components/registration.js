import React, { Component } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Configuration from "./extra/configuration";
import axios from 'axios';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmedPassword: "",
      name: "",
      surname: ""
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, name, surname } = this.state;
    const confirmedPassword = this.state.confirmedPassword;

    // Check if the passwords match
    if (password !== confirmedPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      
       await axios.post(`http://localhost:8081/api/user_details/add_user_details/{userId}`, {
        email,
        password,
        name,
        surname
      });

      // Handle the response as needed

    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
    }
  };

  render() {
    const { email, password, confirmedPassword, name, surname } = this.state;

    return (
      <div>
        <Configuration />
        <HelmetProvider>
          <Helmet>
            <title>{"Pomidoro | Registration"}</title>
          </Helmet>
        </HelmetProvider>

        <link rel="stylesheet" type="text/css" href="css/login.css" />
        <div className="container">
          <div className="left-side">
            <div className="title">Pomidoro</div>
            <div className="logo-container">
              <img src="images/tomato.svg" alt="" id="tomato" crossOrigin="anonymous" />
              <img src="images/login_page/watch.svg" alt="" id="watch" crossOrigin="anonymous" />
            </div>
          </div>

          <div className="login-container">
            <form className="register" action="registration" method="POST" onSubmit={this.handleSubmit}>
              <div className="messages"></div>

              <input name="email" type="text" placeholder="Email@email.com" value={email} onChange={this.handleInputChange} />
              <input name="password" type="password" placeholder="Haslo" value={password} onChange={this.handleInputChange} />
              <input name="confirm-password" type="password" placeholder="Potwierdz haslo" value={confirmedPassword} onChange={this.handleInputChange} />
              <input name="name" type="text" placeholder="Imie" value={name} onChange={this.handleInputChange} />
              <input name="surname" type="text" placeholder="Nazwisko" value={surname} onChange={this.handleInputChange} />
              <button type="submit" title="zaloguj">Zarejestruj</button>
              <p>Masz konto? <a href="login">Zaloguj</a></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
