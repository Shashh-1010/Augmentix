import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

function TaskForm({ onTaskAdded }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      axios.post('/tasks', { text, completed: false, priority, dueDate })
        .then(response => {
          setText('');
          setPriority('Low');
          setDueDate('');
          onTaskAdded();
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
