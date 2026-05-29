import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [keyword, setKeyword] = useState('');

  const fetchTasks = () => {
    const url = keyword
      ? `http://localhost:8080/api/tasks?keyword=${keyword}`
      : 'http://localhost:8080/api/tasks';
    fetch(url)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE'
    }).then(() => fetchTasks());
  };

  const handleSave = () => {
    fetchTasks();
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center pt-4">
      <div style={{width:'480px'}}>
        {showForm ? (
          <TaskForm
            onSave={handleSave}
            editingTask={editingTask}
            setEditingTask={(task) => {
              setEditingTask(task);
              if (!task) setShowForm(false);
            }}
          />
        ) : (
          <div className="rounded-4 overflow-hidden shadow">
            <div style={{background:'#378ADD', padding:'16px 20px'}}>
              <span style={{color:'white', fontSize:'18px', fontWeight:'bold'}}>To-Do</span>
            </div>
            <div style={{background:'white', padding:'16px'}}>
              <TaskList
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={deleteTask}
                keyword={keyword}
                setKeyword={setKeyword}
                onSearch={fetchTasks}
                onAdd={() => {
                  setEditingTask(null);
                  setShowForm(true);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;