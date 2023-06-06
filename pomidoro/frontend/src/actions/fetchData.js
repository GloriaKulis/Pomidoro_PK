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
export const fetchDataForChart = async (token) => {
  try {
    const response = await axios
      .get(`http://localhost:8081/api/tasks/countByWeek/${token}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//registration
export const addUser = async (email, password) => {
  try {
    await axios.post("http://localhost:8081/api/users/add_user", {
      email,
      password,
    });

  } catch (error) {
    console.log(error);
  }
};

export const addUserDetails = async (email, name, surname) => {
  try {
    const response = await axios.get(
      "http://localhost:8081/api/users/id/" + email
    );
    const data = response.data;

    await axios.post(
      `http://localhost:8081/api/user_details/add_user_details/` + data,
      {
        name,
        surname,
      }
    );

  } catch (error) {
    console.log(error);
  }
};