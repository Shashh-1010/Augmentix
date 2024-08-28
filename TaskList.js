import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleComplete = (id) => {
    const task = tasks.find(task => task._id === id);
    axios.put(`/tasks/${id}`, { ...task, completed: !task.completed })
      .then(response => setTasks(tasks.map(task => task._id === id ? response.data : task)))
      .catch(error => console.error('Error updating task:', error));
  };

  const handleEdit = (id) => {
    // Implement edit functionality
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <Task
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
