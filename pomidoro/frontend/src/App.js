import { Route,Routes } from "react-router-dom";
import Achievements from './achievements';
import Registration from './registration';
import Statistics from './statistics';
import Timer from './timer';
import ToDoList from './todolist';
import Login from './login';
import ManageUser from "./manage_user";

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