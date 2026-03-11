import { useState, useEffect } from 'react';

export const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [fitler, setFitler] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = 'https://tasklistapi.vercel.app/tasks';

  useEffect(() => {
    async function startFetch() {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer react-students-token`,
        }
      })
      const data = await response.json();

      const formattedTasks = data.map((task) => ({
        id: task.id,
        text: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        emoji: task.emoji,
      }));

      if(!ignore) {
        setTasks(formattedTasks);
        setIsLoading(false);
      }
    }
    let ignore = false;
    startFetch()
    return () => {
      ignore = true;
    };
  }, []); 

  const addTask = (text) => {
    if (text.trim === '') return;
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    }
    setTasks([...tasks, newTask]);
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id
        ? { ...task, state: task.state === 'pending' ? 'completed' : 'pending' }
        : task
    ));
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const fileredTasks = tasks.filter((task) => {
    if (fitler === 'all') return true;
    if (fitler === 'pending') return task.state === 'pending';
    if (fitler === 'completed') return task.state === 'completed';
  });


  return { tasks: fileredTasks, setTasks, addTask, toggleTask, deleteTask, setFitler, isLoading };
}