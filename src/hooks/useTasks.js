import { useReducer, useEffect } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
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

export default function useTasks() {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  // load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      dispatch({
        type: "LOAD_TASKS",
        payload: JSON.parse(savedTasks),
      });
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    dispatch({
      type: "ADD_TASK",
      payload: text,
    });
  }

  function deleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }

  function toggleTask(id) {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });
  }

  function editTask(id, newText) {
    dispatch({
      type: "EDIT_TASK",
      payload: { id, text: newText },
    });
  }

  function clearCompleted() {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearCompleted,
  };
}
