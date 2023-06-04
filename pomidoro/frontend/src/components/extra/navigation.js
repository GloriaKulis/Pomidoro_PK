
import { Component } from "react";

class Navigation extends Component {



render(){
    return (
      <div>
      <nav>
        <div className="menu">
          <a href="timer" className="navbutton timerbutton">
            <span>Timer</span>
            <img className="button_mobile" alt="" src="public/images/navigation_mobile/timer.svg" />
          </a>
          <a href="todolist" className="navbutton todolist">
            <span>To do list</span>
            <img className="button_mobile" alt="" src="public/images/navigation_mobile/todolist.svg" />
          </a>
          <a href="statistics" className="navbutton statistics">
            <span>Statystyki</span>
            <img className="button_mobile" alt="" src="public/images/navigation_mobile/statistics.svg" />
          </a>
          <a href="achievements" className="navbutton achievement">
            <span>Odznaki</span>
            <img className="button_mobile" alt="" src="public/images/navigation_mobile/achievement.svg" />
          </a>
          <a href="/logout"  className="navbutton logout" onClick={ this.handleLogout}>
            <span>Wyloguj</span>
            <img className="button_mobile" alt="" src="public/images/navigation_mobile/logout.svg" />
          </a>
        </div>
      </nav>
    </div>
    );
}
  }
  
  export default Navigation;