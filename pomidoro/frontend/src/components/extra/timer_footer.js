import React, { Component } from "react";
import { setup } from "../../actions/timerMechanism";

class TimerFooter extends Component {
  componentDidMount() {
    const sessionLength = parseInt(localStorage.getItem("session_length")) ;
    const breakLength = parseInt(localStorage.getItem("break_length")) ;
    const numberOfSessions = parseInt(localStorage.getItem("number_of_sessions")) ;

    const timer = {
      pomodoro: sessionLength,
      breakTime: breakLength,
      sessionsNumber: numberOfSessions,
      sessions: 1,
      description: "",
      mode: "pomodoro",
      remainingTime: {
        total: sessionLength * 60,
        minutes: sessionLength,
        seconds: 0,
      },
    };

    setup(timer);
  }

  render() {
    return (
      <div className="footer_timer">
        <link rel="stylesheet" type="text/css" href="css/footer.css" />
        <div className="buttons">
          <button className="start footer-button" id="start-button">
            Start
          </button>
          <button className="stop footer-button" id="stop-button">
            Stop
          </button>
          <button className="reset footer-button" id="reset-button">
            Reset
          </button>
          <img
            className="timer_tomato"
            alt=""
            src="images/tomato.svg"
            width="175"
            crossOrigin="anonymous"
          />
        </div>

        <div className="timer">
          <div id="timer_clock">
            <span id="timer-minutes">25</span>
            <span className="separator">:</span>
            <span id="timer-seconds">00</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerFooter;