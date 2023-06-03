import React, { Component } from "react";
import Navigation from "./extra/navigation";
import Configuration from "./extra/configuration";
import { setup } from "../actions/timerMechanism";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cookies from "js-cookie";
import axios from 'axios';

import SettingsTimer from "./extra/settingsTimer";

class Timer extends Component {
  state = {
    session_length: '',
    break_length: '',
    number_of_sessions: '',
  }

  async componentDidMount() {
    await axios.get('http://localhost:8081/api/timer/' + Cookies.get('token'))
      .then(response => {
        const data = response.data;
        this.setState({
          session_length: data.session_length,
          break_length: data.break_length,
          number_of_sessions: data.number_of_sessions
        });

        const timer = {
          pomodoro: data.session_length,
          breakTime: data.break_length,
          sessionsNumber: data.number_of_sessions,
          sessions: '',
          description: '',
          remainingTime: {
            total: 1,
            minutes: 1,
            seconds: 1,
          }
        };
        setup(timer);

      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <Configuration />
        <link rel="stylesheet" type="text/css" href="css/timer.css" />
        <link rel="stylesheet" type="text/css" href="css/extra/navigation.css" />
        <HelmetProvider>
          <Helmet>
            <title>{"Pomidoro | Timer"}</title>
          </Helmet>
        </HelmetProvider>

        <div className="base_container">
          <Navigation />

          <main>
            <SettingsTimer/>
            <div className="timer">
              <div className="tomato_holder">
                <img className="timer_tomato" alt="" src="images/tomato.svg" crossOrigin="anonymous" />
                <div id="timer_clock">
                  <span id="timer-minutes">25</span>
                  <span className="separator">:</span>
                  <span id="timer-seconds">00</span>
                </div>
              </div>
              <div id="timer_description">Sesja</div>
            </div>
          </main>

          <footer>
            <button className="start footer-button" id="start-button">Start</button>
            <button className="stop footer-button" id="stop-button">Stop</button>
            <button className="reset footer-button" id="reset-button">Reset</button>
          </footer>
        </div>
        <script type="module" src="./js/timer.js" defer></script>
      </div>
    );
  }
}

export default Timer;