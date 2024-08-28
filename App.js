import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/todos', { text: newTodo });
      setNewTodo(''); // Clear the input field
      fetchTodos();  // Refresh the list
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const clearTodos = async () => {
    try {
      await axios.delete('http://localhost:5000/api/todos');
      setTodos([]); // Clear the list on the client side
    } catch (error) {
      console.error('Error clearing todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a new task"
      />
      <button className="add-button" onClick={addTodo}>Add Task</button>
      <TaskList tasks={todos} />
      <button className="clear-button" onClick={clearTodos}>Clear All</button>
    </div>
  );
}

export default App;
