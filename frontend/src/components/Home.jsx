import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import Form from './Form';

function Home() {
  const [tasks, setTasks] = useState([]);
  const api = axios.create({
    baseURL: 'http://localhost:3001',
  });

  const fetchTasks = async () => {
    try {
      const results = await api.get('/tasks');
      const data = await results.data;
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTask = async (name, status) => {
    try {
      await api.post('/tasks', { name, status });
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (status, id) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <Form saveTask={saveTask} updateTask={updateTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default Home;
