import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

function TodoList() {
  // State variables
  const [taskInput, setTaskInput] = useState(''); // Input for adding/editing tasks
  const [isEditTask, setIsEditTask] = useState(false); // Flag for editing task mode
  const [editId, setEditId] = useState(null); // ID of the task being edited
  const [todos, setTodos] = useState([]); // Array to store todo items
  const [activeFilter, setActiveFilter] = useState('all'); // Active filter for displaying todos
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todo-list"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/check_login', {
          withCredentials: true,
        });
        setIsLoggedIn(response.data.logged_in);
      } catch (error) {
        console.error('Failed to check login status:', error.message);
      }
    };

    checkLoginStatus();
  }, []);

  // Update local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(todos));
  }, [todos]);

  // Handler for input change in the task input field
  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  // Add or edit task based on the mode
  const addOrEditTask = () => {
    if (!taskInput.trim()) return;

    if (!isEditTask) {
      setTodos([...todos, { name: taskInput, status: "pending" }]);
    } else {
      const updatedTodos = todos.map((todo, index) =>
        index === editId ? { ...todo, name: taskInput } : todo
      );
      setTodos(updatedTodos);
      setIsEditTask(false);
    }
    setTaskInput('');
  };

  // Handle key press events (e.g., Enter key) in the task input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addOrEditTask();
    }
  };

  // Edit a task
  const editTask = (id, name) => {
    setIsEditTask(true);
    setEditId(id);
    setTaskInput(name);
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo, index) => index !== id);
    setTodos(updatedTodos);
    setIsEditTask(false);
    if (updatedTodos.length === 0) {
      localStorage.removeItem("todo-list");
    }
  };

  // Update status of a task (toggle between pending and completed)
  const updateStatus = (id) => {
    const updatedTodos = todos.map((todo, index) =>
      index === id
        ? { ...todo, status: todo.status === "pending" ? "completed" : "pending" }
        : todo
    );
    setTodos(updatedTodos);
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTodos([]);
    setIsEditTask(false);
    localStorage.removeItem("todo-list");
  };

  // Filter todos based on active filter
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return todo.status === 'pending';
    if (activeFilter === 'completed') return todo.status === 'completed';
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // JSX
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="min-h-screen bg-black font-jura font-thin">
        <div className="wrapper max-w-screen-sm mx-auto p-6 bg-black rounded-none shadow-none mt-12">
          <div className="task-input flex items-center border-b border-gray-600 pb-1 mb-4">
            <input
              type="text"
              placeholder="Add a new task"
              value={taskInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="outline-none flex-grow bg-transparent text-white placeholder-gray-400"
            />
            <button
              onClick={addOrEditTask}
              className="ml-4 border border-white text-white px-4 py-2 rounded-none hover:bg-white hover:text-black focus:outline-none"
            >
              Add Task
            </button>
          </div>
          <div className="controls flex items-center justify-between border-b border-gray-600 pb-2 mb-4">
            <div className="filters flex">
              {['all', 'pending', 'completed'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`mr-2 px-2 py-1 rounded-none focus:outline-none text-white ${
                    activeFilter === filter 
                    ? 'border border-white' 
                    : 'bg-transparent hover:text-black hover:bg-white'
                  }`}
                >
                  {capitalizeFirstLetter(filter)}
                </button>
              ))}
            </div>
            <button
              onClick={clearAllTasks}
              className={`clear-btn px-3 py-1 rounded-none text-white border border-white ${todos.length ? 'active' : ''} hover:bg-white hover:text-black`}
            >
              Clear All
            </button>
          </div>
          <ul className="task-box overflow-auto max-h-96 text-white">
            {filteredTodos.length === 0 && <span>You don't have any task here</span>}
            {filteredTodos.map((todo, index) => (
              <li key={index} className="task flex items-center justify-between border-b border-gray-600 pb-2 mb-2">
                <label htmlFor={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={index}
                    checked={todo.status === "completed"}
                    onChange={() => updateStatus(index)}
                    className="mr-2 accent-white"
                  />
                  <p className={todo.status === "completed" ? "text-gray-400 line-through" : "text-white"}>{todo.name}</p>
                </label>
                <div className="settings text-white hover:text-black">
                  <i onClick={() => editTask(index, todo.name)} className="uil uil-ellipsis-h cursor-pointer"></i>
                  <ul className="task-menu hidden">
                    <li onClick={() => editTask(index, todo.name)}><i className="uil uil-pen"></i>Edit</li>
                    <li onClick={() => deleteTask(index)}><i className="uil uil-trash"></i>Delete</li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TodoList;
