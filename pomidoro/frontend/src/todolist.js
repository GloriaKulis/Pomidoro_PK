import React, { Component } from "react";
import Cookies from "js-cookie";
import Navigation from "./extra/navigation";
import Configuration from "./extra/configuration";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from "axios";
import TimerFooter from "./timer_footer";

class ToDoList extends Component {
  state = {
    tasks: [],
    description: ""
  };

  componentDidMount() {
    this.fetchTasks();
  }
  
  fetchTasks() {
    axios
      .get("http://localhost:8081/api/tasks/" + Cookies.get('token'))
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const description = form.elements.description.value;
  
    axios
      .post("http://localhost:8081/api/tasks/add/" + Cookies.get('token'),  description , {
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((response) => {
        console.log(response);
        form.reset();
        this.fetchTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  markAsDone = (id) => {
    axios
      .put("http://localhost:8081/api/tasks/markAsCompleted/" + id, null, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        this.fetchTasks(); // Ponowne pobranie zadań po oznaczeniu zadania jako zrobione
      })
      .catch((error) => {
        console.error(error);
      });
  };
  


  render() {
    const { tasks } = this.state;

    return (
      <div>
        <link rel ="stylesheet" type = "text/css" href="css/todolist.css"/>
        <link rel ="stylesheet" type = "text/css" href="css/extra/navigation.css"/>                 
        <Configuration />
        <HelmetProvider>
          <Helmet>
            <title>Pomidoro | ToDoList</title>
          </Helmet>
        </HelmetProvider>

        <div className="base_container">
          <Navigation />
          <main>
            <div className="add-new">
              <div className="label">Dodaj nowe zadanie:</div>
              <form action="newTask" onSubmit={this.handleSubmit}>
                <input name="description" id="add_new_task" type="text" placeholder="nowe zadanie" />
                <button type="submit" id="save">Zapisz</button>
              </form>
            </div>

            <div className="label">Zadania:</div>
            <div className="task_container">
              <div className="inner-label">Do zrobienia:</div>
              <div className="todo_container">
                {tasks?.map((task) => {
                  if (task.date_of_completion === null) {
                    return (
                      <div className="single_task" key={task.id_task} id={task.id_task}>
                        <button className="mark" onClick={() => this.markAsDone(task.id_task)}></button>
                        <div className="task_text">{task.description}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="inner-label">Zrobione:</div>
              <div className="done_container">
                {tasks?.map((task) => {
                  if (task.date_of_completion !== null) {
                    return (
                      <div className="single_task" key={task.id_task} id={task.id_task}>
                        <button className="mark" onClick={() => this.markAsDone(task.id_task)}></button>
                        <div className="task_text">{task.description}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </main>
          <TimerFooter/>
        </div>
      </div>
    );
  }
}

export default ToDoList;

