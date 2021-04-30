import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

let id = 0;

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    
    const mountedTaskObject = {
      id: id++,
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, mountedTaskObject]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) task.isComplete = !task.isComplete;
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id);

    setTasks(updatedTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>My tasks 📌</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Add a new task" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            data-testid="add-task-input"
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}