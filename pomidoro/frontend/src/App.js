import { Route,Routes } from "react-router-dom";
import Achievements from './components/achievements';
import Registration from './components/registration';
import Statistics from './components/statistics';
import Timer from './components/timer';
import ToDoList from './components/todolist';
import Login from './components/login';
import ManageUser from "./components/manage_user";


function App(){
return(

    <Routes>
        <Route path="" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/statistics" element={<Statistics />} /> 
        <Route path="/toDoList" element={<ToDoList />} />
        <Route path="/manageDB" element={<ManageUser/>} />

  </Routes>

);


}
export default App;