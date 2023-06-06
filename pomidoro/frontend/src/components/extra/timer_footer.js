import React, { Component } from "react";
import { setUpTimer } from "../../actions/fetchData";

class TimerFooter extends Component {


  async componentDidMount() {
    setUpTimer();

  }


  render() {
    return (
      <div className="footer_timer">
        <link rel="stylesheet" type="text/css" href="css/footer.css" />
        <div className="buttons">
            <button className="start footer-button" id="start-button">Start</button>
            <button className="stop footer-button" id="stop-button">Stop</button>
            <button className="reset footer-button" id="reset-button">Reset</button>
          <div className="timer_tomato">
            <img
            
              alt=""
              src="images/tomato.svg"
              width="120"
              crossOrigin="anonymous"
            />
          

            <div className="timer">
              <div id="timer_clock">
                <span id="timer-minutes">25</span>
                <span className="separator">:</span>
                <span id="timer-seconds">00</span>
              </div>
              <div id="timer_description">Sesja</div>
          </div>
        </div>
        </div>

        </div>



    );
  }
}

export default TimerFooter;