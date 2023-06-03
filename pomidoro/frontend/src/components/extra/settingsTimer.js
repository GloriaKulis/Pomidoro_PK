import { Component } from 'react';
import {updateTimerValue} from '../../actions/timerFunction';
import Cookies from "js-cookie";
import axios from 'axios';
class SettingsTimer extends Component{

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
        });
    }
    newSettings = () => {
        const sessionLength = document.querySelector('input[name="session_length"]').value;
        const breakLength = document.querySelector('input[name="break_length"]').value;
        const numberOfSessions = document.querySelector('input[name="number_of_sessions"]').value;
    
        updateTimerValue(`http://localhost:8081/api/timer/setSessionLength/${Cookies.get('token')}`, sessionLength);
        updateTimerValue(`http://localhost:8081/api/timer/setBreakLength/${Cookies.get('token')}`, breakLength);
        updateTimerValue(`http://localhost:8081/api/timer/setNumberOfSessions/${Cookies.get('token')}`, numberOfSessions);
    };
        
    
    render(){
        return(
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
        );
    }

}
export default SettingsTimer;