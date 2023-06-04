import Cookies from "js-cookie";
import axios from "axios";

//Statistic
export const statisticsByUser = () =>{
    axios
      .get(`http://localhost:8081/api/tasks/countByWeek/${Cookies.get('token')}`)

} 