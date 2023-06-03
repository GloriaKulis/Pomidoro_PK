export const setup = (timer) =>{
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
    //   document.getElementById('timer_description').innerHTML = `${timer.description}`;

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
            //   document.getElementById('timer_description').innerHTML = 'Nauka zakończona!';
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
  }