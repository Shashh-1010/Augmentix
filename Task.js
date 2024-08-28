import React from 'react';
import './Task.css';

function Task({ task, onDelete, onComplete, onEdit }) {
  return (
    <li className={`task ${task.priority.toLowerCase()}`}>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={() => onComplete(task._id)}
      >
        {task.text} (Due: {task.dueDate})
      </span>
      <button onClick={() => onEdit(task._id)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </li>
  );
}

export default Task;
