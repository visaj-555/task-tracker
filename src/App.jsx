import "./App.css";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  function addTask() {
    if (task.trim() === "") {
      return;
    }

    if (tasks.includes(task)) {
      alert("Task already exists");
      return;
    }

    setTasks([...tasks, {text : task, completed : false}]);
    setTask("");
  }

  function deleteTask(indexToDelete) {
    tasks.filter((task, index) => index !== indexToDelete);
    setTasks(tasks.filter((task, index) => index !== indexToDelete));
  }

  return (
    <div>
      <h1> Task Tracker </h1>

      <p> Tasks : {tasks.length} </p>

      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input type="checkbox" />
              <span> {task.text} </span>
               <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
