import axios from 'axios';
import Cookies from 'js-cookie';

export const updateTimerValue = async (url, value) => {
  try {
        const response = await axios
            .put(url, value, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};





export const fetchTimerData = async () => {

    await axios.get('http://localhost:8081/api/timer/' + Cookies.get('token'))
    .then(response => {
        const data = response.data;
        this.setState({
        session_length: data.session_length,
        break_length: data.break_length,
        number_of_sessions: data.number_of_sessions
        });
    });

};

