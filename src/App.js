import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('Axios error:', error.message));
  }, []);

  const addTask = () => { 
    if (inputValue.trim()) {
      axios.post('http://localhost:8080/api/tasks', { name: inputValue, completed: false })
        .then(response => {
          setTasks([...tasks, response.data]);
          setInputValue("");
        })
        .catch(error => console.error('Axios error:', error.message));
    }
  };

  const deleteTask = (index) => { 
    const task = tasks[index];
    axios.delete(`http://localhost:8080/api/tasks/${task.id}`)
      .then(() => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
      })
      .catch(error => console.error('Axios error:', error.message));
  };

  return (
    <div className="App">
      <div className='titlediv'>
        <h1>To-Do-List Application</h1>
      </div>
      <header className="App-header">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Yeni görev ekleyin"
        />
        <button onClick={addTask}>Ekle</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.name}
              <button onClick={() => deleteTask(index)}>Sil</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;



