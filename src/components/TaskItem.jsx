import './TaskItem.css';

function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <div className="task-item">
      <div className="task-item-header">
        <div className="task-item-header-left">
          <span className= 'task-item-emoji'>{task.emoji}</span>
          <h3 className= 'task-item-title'>{task.text}</h3>
        </div>
        <div className="task-item-header-right">
          <button className="btn-delete" onClick={deleteTask}>X</button>
        </div>
      </div>
      <p className= 'task-item-description'>{task.description}</p>
      <div className="task-item-meta">
        <span className= {`task-item-${task.priority}`}>{task.priority}</span>
        <span className= {`task-item-${task.status}`}>{task.status}</span>
      </div>
    </div>
  );
}

export default TaskItem;
