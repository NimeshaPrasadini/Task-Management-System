// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import api from './config';

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the API
        const fetchTasks = async() => {
            debugger
            try {
                const response = await api.get('/Tasks');
                debugger
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async(task) => {
        try {
            const response = await api.post('/Tasks', task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async(taskId) => {
        try {
            debugger
            await api.delete(`/Tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
    <div>
      <h1>Task Management System</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
    );
}

export default App;