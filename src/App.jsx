import "./App.css";
import { useState, useEffect, useReducer } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  // const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [tasks, dispatch] = useReducer(reducer, initialState);

  // remaining tasks
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  const initialState = [];

  function reducer(state, action) {
    switch (action.type) {
      case "ADD_TASK":
        return [
          ...state,
          { id: Date.now(), text: action.payload, completed: false },
        ];

      case "DELETE_TASK":
        return state.filter((task) => task.id !== action.payload);

      case "TOGGLE_TASK":
        return state.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        );

      case "EDIT_TASK":
        return state.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task,
        );

      case "CLEAR_COMPLETED":
        return state.filter((task) => !task.completed);

      case "LOAD_TASKS":
        return action.payload;

      default:
        return state;
    }
  }

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

    dispatch({
      type: "ADD_TASK",
      payload: task,
    });

    setTask("");
  }

  function deleteTask(idToDelete) {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }

  function toggleTask(idToToggle) {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });
  }

  function editTask(id, newText) {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: id,
        text: newText,
      },
    });
  }

  function clearCompleted() {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  }

  // save tasks to localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      dispatch({
        type: "LOAD_TASKS",
        payload: JSON.parse(savedTasks),
      });
    }
  }, []);

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
