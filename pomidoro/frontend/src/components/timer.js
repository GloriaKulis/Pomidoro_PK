import React, { Component } from "react";
import Navigation from "./extra/navigation";
import Configuration from "./extra/configuration";

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { setUpTimer } from "../actions/fetchData";
import SettingsTimer from "./extra/settingsTimer";

class Timer extends Component {


  async componentDidMount() {
    setUpTimer();
  }

  render() {
    return (
      <div>
        <Configuration />
        <link rel="stylesheet" type="text/css" href="css/timer.css" />
        <link rel="stylesheet" type="text/css" href="css/extra/navigation.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
      </div>
    );
  }
}

export default Timer;