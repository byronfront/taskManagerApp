import { useState } from 'react';
import TaskItem from './TaskItem';
import { useTask } from '../hooks/useTask';
import './TaskList.css';

function TaskList({name}) {
  const { 
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    setFitler,
    isLoading
  } = useTask();

  const [newTask, setNewTask] = useState('');


  const handleChage = (e) => {
    setNewTask(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  }

    return (
        <>
            <h2>Lista: {name}</h2>
            <div className="list">
              <button type="button" onClick={() => addTask('Nueva tarea')}>Nueva tarea</button>
            </div>
            <div className="list-form">
              <form className="list-form-input" onSubmit={handleSubmit}>
                <input 
                  className="list-form-input-text"
                  type="text" 
                  placeholder="Escribe una tarea..." 
                  value={newTask} 
                  onChange={handleChage} 
                />
                <button type="submit">Agregar</button>
              </form>
            </div>
            <div className="list-filters">
              <button onClick={() => setFitler('all')}>Todas</button>
              <button onClick={() => setFitler('pending')}>Pendientes</button>
              <button onClick={() => setFitler('completed')}>Completadas</button>
            </div>
            <div className="list-tasks">
              {isLoading ? (
                <p>Cargando tareas...</p>
              ) : (
                <ul>
                  {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} deleteTask={() => deleteTask(task.id)} toggleTask={() => toggleTask(task.id)}/>
                  ))}
                </ul>
              )}
            </div>
        </>
    );
}

export default TaskList;
