import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
//hi
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        // { id: 1, title: "Wash You Hair", created_by: "Ronson", status: "pau" },
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
      ],
      users: [],
      id: 6,
      title: "",
      created_by: "",
      status: ""
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

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  delete = title => {
    const tasks = this.state.tasks.filter(task => title !== task.title);
    this.setState({ tasks });
  };

  render() {
    const { tasks } = this.state;
    return (
      <div class="app">
        <div id="newForm">
          Create New Task
          <form id="form" onSubmit={this.handleSubmit}>
            <input
              name="title"
              onChange={this.handleChange}
              type="text"
              placeholder="Title"
            />
            <input
              name="created_by"
              onChange={this.handleChange}
              type="text"
              placeholder="Created By"
            />
            <select name="status" onChange={this.handleChange}>
              <option value="queue"> To Do</option>
              <option value="progress"> In Progress</option>
              <option value="pau"> All Pau</option>
            </select>
            <input type="submit" />
          </form>
        </div>
        <div class="list" id="queueList">
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
                created_by={task.created_by}
                status={task.status}
                delete={this.delete}
              />
            ))}
        </div>
        <div class="list" id="progressList">
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
                created_by={task.created_by}
                status={task.status}
                delete={this.delete}
              />
            ))}
        </div>
        <div class="list" id="pauList">
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
                created_by={task.created_by}
                status={task.status}
                delete={this.delete}
              />
            ))}
        </div>
      </div>
    );
  }
}

function Card(props) {
  return (
    <div className={props.status}>
      <div>{props.title}</div>
      <div>{props.created_by}</div>
      <button onClick={() => props.delete(props.title)}>Delete</button>
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
