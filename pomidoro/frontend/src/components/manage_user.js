import { Component } from "react";
import React from "react";
import Configuration from "./extra/configuration";
import { Helmet, HelmetProvider } from "react-helmet-async";

// import { useNavigate } from "react-router-dom";

import axios from 'axios';


class ManageUser extends Component{
    state = {
        users: [],
        description: ""
      };

    componentDidMount() {
        this.fetchUsers();
      }
      
      fetchUsers() {
        axios
          .get("http://localhost:8081/api/users/users")
          .then(response => {
            this.setState({ users: response.data });
          })
          .catch((error) => {
            console.error(error);
          });
      }

      deleteUser = (id) =>{
        axios
        .delete("http://localhost:8081/api/users/deleteUser" + id, null, {
          headers: {
            "Content-Type": "application/json",
          }})
      }

    render() {
        const { users } = this.state;
    
        return (
          <div>
                <link rel ="stylesheet" type = "text/css" href="css/todolist.css"/>
                <link rel ="stylesheet" type = "text/css" href="css/extra/navigation.css"/>                 
                <Configuration />
                <HelmetProvider>
                <Helmet>
                    <title>Pomidoro | ManageDB</title>
                </Helmet>
                </HelmetProvider>

                <div className="base_container">
                    
                    <div className="add-new">
         
                        <div className="label">Baza użytkowników:</div>
                        <div className="task_container">
                        
                        <div className="todo_container">
                            {users?.map((user) => {
                                return(
                                <div className="single_task" key={user.id_user} id={user.id_user}>
                                    <button className="mark" onClick={() => this.deleteUser(user.id_user)} ></button>
                                    <div className="task_text">{user.email}</div>
                                </div>
                                );
                            
                            })}
                        </div>
                    </div>
                </div>
            </div>
            /</div>
    );}
}

export default ManageUser;