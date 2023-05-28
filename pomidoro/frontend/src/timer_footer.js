import React, { Component } from "react";

class TimerFooter extends Component {
  componentDidMount() {
    const sessionLength = parseInt(localStorage.getItem("session_length")) || 25;
    const breakLength = parseInt(localStorage.getItem("break_length")) || 5;
    const numberOfSessions = parseInt(localStorage.getItem("number_of_sessions")) || 4;

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

    let interval;

    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");
    const resetButton = document.getElementById("reset-button");

    startButton.addEventListener("click", () => {
      startTimer();
    });
    stopButton.addEventListener("click", () => {
      stopTimer();
    });
    resetButton.addEventListener("click", () => {
      resetTimer();
    });

    // Zapisywanie stanu timera w localStorage przed opuszczeniem strony
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("timerState", JSON.stringify(timer));
    });

    const savedTimerState = localStorage.getItem("timerState");

    if (savedTimerState) {
      const parsedTimerState = JSON.parse(savedTimerState);

      if (parsedTimerState.mode === "pomodoro") {
        timer.remainingTime = parsedTimerState.remainingTime;
        timer.sessions = parsedTimerState.sessions;
        timer.description = `Sesja ${timer.sessions}`;
      } else {
        timer.mode = "breakTime";
        timer.remainingTime = parsedTimerState.remainingTime;
        timer.sessions = parsedTimerState.sessions;
        timer.description = `Przerwa ${timer.sessions - 1}`;
      }

      updateClock();
      startTimer();
    }

    function getRemainingTime(endTime) {
      const difference = endTime - Date.now();

      const total = Math.floor(difference / 1000);
      const minutes = Math.floor((total / 60) % 60);
      const seconds = Math.floor(total % 60);

      return {
        total,
        minutes,
        seconds,
      };
    }

    // timer odliczanie
    function startTimer() {
      const endTime = Date.now() + timer.remainingTime.total * 1000;

      interval = setInterval(function () {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();
        if (timer.remainingTime.total <= 0) {
          clearInterval(interval);
          if (timer.mode === "pomodoro") {
            if (++timer.sessions > timer.sessionsNumber) {
              timer.sessions = 1;
              resetTimer();
              document.title = "Nauka zakończona!";
              document.getElementById("timer_description").innerHTML = "Nauka zakończona!";
              return;
            }
            switchMode("breakTime");
          } else {
            switchMode("pomodoro");
          }

          startTimer();
        }
      }, 1000);
    }

    function stopTimer() {
      clearInterval(interval);
    }

    function resetTimer() {
      clearInterval(interval);
      switchMode(timer.mode);
    }

    //updateuje zegar na stronie
    function updateClock() {
      const minutes = `${timer.remainingTime.minutes}`.padStart(2, "0");
      const seconds = `${timer.remainingTime.seconds}`.padStart(2, "0");

      document.getElementById("timer-minutes").textContent = minutes;
      document.getElementById("timer-seconds").textContent = seconds;
      document.title = `${minutes}:${seconds} | ${timer.description}`;
    }

    //obsluga zmiany trybu
    function switchMode(mode) {
      timer.mode = mode;
      timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
      };
      if (mode === "pomodoro") {
        timer.description = `Sesja ${timer.sessions}`;
      } else {
        timer.description = `Przerwa ${timer.sessions - 1}`;
      }
      updateClock();
    }

    switchMode("pomodoro");
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