import { useState } from "react";

function TaskItem({
  task,
  deleteTask,
  toggleTask,
  editTask,
  editingId,
  setEditingId
}) {

  const [editText, setEditText] = useState(task.text);

  const isEditing = editingId === task.id;

  function handleSave() {
    if (editText.trim() === "") return;
    editTask(task.id, editText);
    setEditingId(null);
  }

  return (
    <li>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button onClick={handleSave}>
            Save
          </button>

          <button onClick={() => setEditingId(null)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            {task.text}
          </span>

          <button onClick={() => setEditingId(task.id)}>
            ✏️
          </button>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </>
      )}

    </li>
  );
}

export default TaskItem;