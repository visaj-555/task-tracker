import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  editTask,
  editingId,
  setEditingId,
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      ))}
    </ul>
  );
}

export default TaskList;
