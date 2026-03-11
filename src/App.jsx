import "./App.css";
import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  // remaining tasks
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  // filtered tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  function addTask() {
    if (task.trim() === "") return;

    if (tasks.some((t) => t.text === task)) {
      alert("Task already exists");
      return;
    }

    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);

    setTask("");
  }

  function deleteTask(idToDelete) {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  }

  function toggleTask(idToToggle) {
    setTasks(
      tasks.map((task) =>
        task.id === idToToggle ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function editTask(id, newText) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  // save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>Task Tracker</h1>

      {/* remaining tasks counter */}
      <p>{remainingTasks} tasks remaining</p>

      {/* input */}
      <TaskInput task={task} setTask={setTask} addTask={addTask} />

      {/* filter buttons */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* task list */}
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
        editingId={editingId}
        setEditingId={setEditingId}
      />

      {/* clear completed */}
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;
