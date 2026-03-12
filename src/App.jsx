import "./App.css";
import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks, addTask, deleteTask, toggleTask, editTask, clearCompleted } =
    useTasks();

  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;

    return true;
  });

  function handleAddTask() {
    if (task.trim() === "") return;

    if (tasks.some((t) => t.text === task)) {
      alert("Task already exists");
      return;
    }

    addTask(task);

    setTask("");
  }

  return (
    <div>
      <h1>Task Tracker</h1>

      <p>{remainingTasks} tasks remaining</p>

      <TaskInput task={task} setTask={setTask} addTask={handleAddTask} />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />

      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;
