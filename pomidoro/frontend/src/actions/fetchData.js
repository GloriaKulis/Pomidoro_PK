import Cookies from "js-cookie";
import axios from "axios";
import { setup } from "./timerMechanism";

//login
export const loginUser = async (email, password) => {
  try {

    await axios.post('http://localhost:8081/api/users/login', {
      email: email,
      password: password
    });

    
  } catch (error) {
    console.error(error);
  }
};


const isAuthenticated = async () => {

  const token = localStorage.getItem("token")

  return await axios("http://localhost:8080/api/v1/auth/authenticate", {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  }).then((res) => {
      return res;
  });
}


export const setCookieAndNavigate = async (email,navigate) =>{

  try{
    const response = await axios.get('http://localhost:8081/api/users/id/' + email);
    const data = response.data;

    Cookies.set('token', data);

    navigate('/timer', { replace: true });

  } catch (error) {
    console.error(error);
  }

}



//timer
export const setUpTimer = async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/timer/' + Cookies.get('token'));
    const data = response.data;
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
      },
    };

    setup(timer);
  } catch (error) {
    console.error(error);
  }
};


//Statistic
export const statisticsByUser = () =>{
  axios
  .get(`http://localhost:8081/api/tasks/countByWeek/${Cookies.get('token')}`)
  .then((response) => {
    const data = response.data;
    
      this.renderChart();
    
  })
  .catch((error) => {
    console.error(error);
  });

} 