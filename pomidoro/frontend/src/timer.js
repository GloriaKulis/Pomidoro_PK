import React, { Component } from "react";
import Navigation from "./extra/navigation";
import Configuration from "./extra/configuration";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cookies from "js-cookie";
import axios from 'axios';

class Timer extends Component {
  state = {
    session_length: '',
    break_length: '',
    number_of_sessions: '',
  }

  componentDidMount() {
    axios.get('http://localhost:8081/api/timer/' + Cookies.get('token'))
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

        let interval;

        const startButton = document.getElementById('start-button');
        const stopButton = document.getElementById('stop-button');
        const resetButton = document.getElementById('reset-button');

        startButton.addEventListener('click', () => { startTimer(); });
        stopButton.addEventListener('click', () => { stopTimer(); });
        resetButton.addEventListener('click', () => { resetTimer(); });

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
          console.log(timer.pomodoro);
          document.getElementById('timer_description').innerHTML = `${timer.description}`;

          interval = setInterval(function () {
            timer.remainingTime = getRemainingTime(endTime);
            updateClock();
            if (timer.remainingTime.total <= 0) {
              clearInterval(interval);
              if (timer.mode === 'pomodoro') {
                if (++timer.sessions > timer.sessionsNumber) {
                  timer.sessions = 1;
                  resetTimer();
                  document.title = 'Nauka zakończona!';
                  document.getElementById('timer_description').innerHTML = 'Nauka zakończona!';
                  return;
                }
                switchMode('breakTime');
              } else {
                switchMode('pomodoro');
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
          const minutes = `${timer.remainingTime.minutes}`.padStart(2, '0');
          const seconds = `${timer.remainingTime.seconds}`.padStart(2, '0');

          console.log(timer.remainingTime.minutes)
          document.getElementById('timer-minutes').textContent = minutes;
          document.getElementById('timer-seconds').textContent = seconds;
          document.title = `${minutes}:${seconds} | ${timer.description}`;
          localStorage.setItem('remainingTime.total', timer.remainingTime.total);
          //dodać localStore
        }

        //obsluga zmiany trybu
        function switchMode(mode) {
          timer.mode = mode;
          timer.remainingTime = {
            total: timer[mode] * 60,
            minutes: timer[mode],
            seconds: 0,
          };
          if (mode === 'pomodoro') {
            timer.description = `Sesja ${timer.sessions}`;
          } else {
            timer.description = `Przerwa ${timer.sessions - 1}`;
          }
          updateClock();
        }

        switchMode('pomodoro');
      })
      .catch(error => {
        console.error(error);
      });
  }

  //UPDATE WARTOSCI
  newSettings = () => {
    const sessionLength = document.querySelector('input[name="session_length"]').value;
    const breakLength = document.querySelector('input[name="break_length"]').value;
    const numberOfSessions = document.querySelector('input[name="number_of_sessions"]').value;

    console.log(sessionLength);
    console.log(Cookies.get('token'));
    axios.put(`http://localhost:8081/api/timer/setSessionLength/${Cookies.get('token')}`, sessionLength, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    axios.put(`http://localhost:8081/api/timer/setBreakLength/${Cookies.get('token')}`, breakLength, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    axios.put(`http://localhost:8081/api/timer/setNumberOfSessions/${Cookies.get('token')}`, numberOfSessions, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

  };

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
            <form action="setTimer">
              <div className="session_length setter">
                <div className="description">Czas trwania jednej sesji (min)</div>
                <input className="new" name="session_length" type="number" placeholder={this.state.session_length} />
              </div>
              <div className="break_length setter">
                <div className="description">Długość przerwy (min)</div>
                <input className="new" name="break_length" type="number" placeholder={this.state.break_length} />
              </div>
              <div className="number_of_breaks setter">
                <div className="description">Ilość sesji</div>
                <input className="new" name="number_of_sessions" type="number" placeholder={this.state.number_of_sessions} />
              </div>
              <button type="button" id="save" onClick={this.newSettings}>Zapisz</button>
            </form>
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