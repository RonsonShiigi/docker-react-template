import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
//hi
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: [],
      id: 6,
      title: "",
      body: "",
      priority: "",
      status: "",
      created_by: "",
      assigned_to: ""
    };
    //bindings
    this.getUsers = this.getUsers.bind(this);
    this.getTasks = this.getTasks.bind(this);

    this.getUsers();
    this.getTasks();
  }

  getUsers() {
    fetch("/api/users")
      .then(res => {
        console.log("res", res);
        // return res.json();
      })
      .then(body => {
        this.setState({ users: body });
      });
  }

  getTasks() {
    fetch("/api/tasks")
      .then(res => {
        console.log("res", res);
        return res.json();
      })
      .then(body => {
        console.log("body", body);
        this.setState({ tasks: body });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const tasks = this.state.tasks;
    tasks.push({
      title: this.state.title,
      created_by: this.state.created_by,
      status: this.state.status
    });
    this.setState({ tasks });
  };

  createTask = e => {
    console.log("booboo");
    let s = this.state;
    e.preventDefault();

    const newTask = {
      title: s.title,
      body: s.body,
      priority: s.priority,
      status: s.status,
      created_by: s.created_by,
      assigned_to: s.assigned_to
    };
    console.log(newTask);

    const headers = { "Content-Type": "application/json" };
    fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers
    }).then(res => {
      return fetch("api/tasks")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.setState({ tasks: body });
        });
    });
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  shiftUp = id => {
    const tasks = this.state.tasks;
    let editTask = {};
    const headers = { "Content-Type": "application/json" };
    tasks.map(task => {
      if (task.id === id) {
        editTask.id = id;
        editTask.title = task.title;
        editTask.body = task.body;
        editTask.priority = task.priority;
        editTask.created_by = task.created_by;
        editTask.assigned_to = task.assigned_to;
        if (task.status === "progress") {
          editTask.status = "pau";
          return editTask;
        } else if (task.status === "queue") {
          editTask.status = "progress";
          return editTask;
        }
      }
    });
    fetch("/api/tasks/up", {
      method: "POST",
      body: JSON.stringify(editTask),
      headers
    }).then(res => {
      return fetch("api/tasks")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.setState({ tasks: body });
        });
    });
  };

  shiftDown = id => {
    const tasks = this.state.tasks;
    let editTask = {};
    const headers = { "Content-Type": "application/json" };
    tasks.map(task => {
      if (task.id === id) {
        editTask.id = id;
        editTask.title = task.title;
        editTask.body = task.body;
        editTask.priority = task.priority;
        editTask.created_by = task.created_by;
        editTask.assigned_to = task.assigned_to;
        if (task.status === "pau") {
          editTask.status = "progress";
          return editTask;
        } else if (task.status === "progress") {
          editTask.status = "queue";
          return editTask;
        }
      }
    });
    // console.log("outgoing", editTask);
    fetch("/api/tasks/down", {
      method: "POST",
      body: JSON.stringify(editTask),
      headers
    }).then(res => {
      return fetch("api/tasks")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.setState({ tasks: body });
        });
    });
  };

  delete = id => {
    const headers = { "Content-Type": "application/json" };
    let data = { useMe: id };
    fetch("/api/tasks/delete", {
      method: "POST",
      body: JSON.stringify(data),
      headers
    }).then(res => {
      return fetch("api/tasks")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.setState({ tasks: body });
        });
    });
  };

  render() {
    const { tasks } = this.state;
    return (
      <div className="app">
        <div id="listContainer">
          <div className="list" id="queueList">
            To Do
            {tasks
              .filter(task => {
                if (task.status === "queue") {
                  return task;
                }
              })
              .map(task => (
                <Card
                  id={task.id}
                  title={task.title}
                  body={task.body}
                  priority={task.priority}
                  status={task.status}
                  created_by={task.created_by}
                  assigned_to={task.assigned_to}
                  shiftUp={this.shiftUp}
                  shiftDown={this.shiftDown}
                  delete={this.delete}
                />
              ))}
          </div>
          <div className="list" id="progressList">
            In Progress
            {tasks
              .filter(task => {
                if (task.status === "progress") {
                  return task;
                }
              })
              .map(task => (
                <Card
                  id={task.id}
                  title={task.title}
                  body={task.body}
                  priority={task.priority}
                  status={task.status}
                  created_by={task.created_by}
                  assigned_to={task.assigned_to}
                  shiftUp={this.shiftUp}
                  shiftDown={this.shiftDown}
                  delete={this.delete}
                />
              ))}
          </div>
          <div className="list" id="pauList">
            All Pau
            {tasks
              .filter(task => {
                if (task.status === "pau") {
                  return task;
                }
              })
              .map(task => (
                <Card
                  id={task.id}
                  title={task.title}
                  body={task.body}
                  priority={task.priority}
                  status={task.status}
                  created_by={task.created_by}
                  assigned_to={task.assigned_to}
                  shiftUp={this.shiftUp}
                  shiftDown={this.shiftDown}
                  delete={this.delete}
                />
              ))}
          </div>
        </div>
        <div id="newForm">
          <h1 className="create">Create New Task</h1>
          <form id="form" onSubmit={this.createTask}>
            <input
              name="title"
              onChange={this.handleChange}
              type="text"
              placeholder="Title"
            />
            <input
              name="body"
              onChange={this.handleChange}
              type="text"
              placeholder="Body"
            />
            <select name="priority" onChange={this.handleChange}>
              <option value="0">Select Priority:</option>
              <option value="asap">ASAP</option>
              <option value="medium">Medium</option>
              <option value="chill">Chill</option>
            </select>
            <input
              name="created_by"
              onChange={this.handleChange}
              type="text"
              placeholder="Created By"
            />

            <input
              name="assigned_tp"
              onChange={this.handleChange}
              type="text"
              placeholder="Assigned To"
            />
            <select name="status" onChange={this.handleChange}>
              <option value="0">Select Status:</option>
              <option value="queue"> To Do</option>
              <option value="progress"> In Progress</option>
              <option value="pau"> All Pau</option>
            </select>
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

function Card(props) {
  return (
    <div className={props.status}>
      <div className="taskTitle">{props.title}</div>
      <div className="taskBody">{props.body}</div>
      <div className="cardPriority">Priority: {props.priority}</div>
      <div className="created_by">By {props.created_by}</div>
      <button onClick={() => props.shiftUp(props.id)}>Move Up</button>
      <button onClick={() => props.shiftDown(props.id)}>Move Down</button>
      <button onClick={() => props.delete(props.id)}>Delete</button>
    </div>
  );
}

export default App;

// // bindings
// this.smokeTest = this.smokeTest.bind(this);
// this.getUsers = this.getUsers.bind(this);
// this.updateUser = this.updateUser.bind(this);
// this.createUser = this.createUser.bind(this);

// // init
// this.smokeTest();
// this.getUsers();
//   }

// smokeTest() {
//   fetch("/api/smoke")
//     .then(res => {
//       return res.json();
//     })
//     .then(body => {
//       this.setState({ smoke: body.smoke });
//     });
// }

// getUsers() {
//   fetch("/api/users")
//     .then(res => {
//       return res.json();
//     })
//     .then(body => {
//       this.setState({ users: body });
//     });
// }

// updateUser(e) {
//   this.setState({ newUser: { username: e.target.value } });
// }

// createUser() {
//   const newUser = this.state.newUser;
//   const headers = { "Content-Type": "application/json" };
//   fetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify(newUser),
//     headers
//   }).then(res => {
//     return fetch("/api/users")
//       .then(res => {
//         return res.json();
//       })
//       .then(body => {
//         this.setState({ users: body });
//       });
//   });

{
  /* <div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />

    <div>{this.state.smoke ? this.state.smoke : ""}</div>

    <div>
      {this.state.users.map(user => {
        return <div>{user.username}</div>;
      })}
    </div>

    <div>
      <label> Create new User: </label>
      <input
        type="text"
        value={this.state.newUser.username}
        onChange={this.updateUser}
      />
      <button onClick={this.createUser}>Create User</button>
    </div>

    <p>
      Edit <code>src/App.js</code> and save to reload.
          </p>

    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
          </a>
  </header>
</div> */
}

// // { id: 1, title: "Wash You Hair", created_by: "Ronson", status: "pau" },
// {
//   id: 2,
//   title: "Fry the Bacon",
//   created_by: "Dr Dre",
//   status: "queue"
// },
// {
//   id: 3,
//   title: "Jumping Jacks",
//   created_by: "Colonel Mustard",
//   status: "progress"
// },
// {
//   id: 4,
//   title: "Pound Drums",
//   created_by: "Travis Barker",
//   status: "progress"
// },
// {
//   id: 5,
//   title: "Smoke Weed",
//   created_by: "Jah",
//   status: "queue"
// }

// moveUp = id => {
//   console.log(id);
//   const tasks = this.state.tasks;
//   tasks.map(task => {
//     if (task.id === id) {
//       if (task.status === "queue") {
//         task.status = "progress";
//         return task;
//       } else if (task.status === "progress") {
//         task.status = "pau";
//         return task;
//       }
//     }
//     return tasks;
//   });
//   this.setState({ tasks });
// };
