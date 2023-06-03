import axios from 'axios';
import Cookies from 'js-cookie';


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