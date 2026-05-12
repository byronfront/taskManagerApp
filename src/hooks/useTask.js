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
    if (typeof text !== 'string' || text.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      description: '',
      status: 'todo',
      priority: 'medium',
      emoji: '📝',
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'done' ? 'todo' : 'done',
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const fileredTasks = tasks.filter((task) => {
    if (fitler === 'all') return true;
    if (fitler === 'pending') {
      return task.status === 'todo' || task.status === 'in-progress';
    }
    if (fitler === 'completed') return task.status === 'done';
    return true;
  });


  return { tasks: fileredTasks, setTasks, addTask, toggleTask, deleteTask, setFitler, isLoading };
}