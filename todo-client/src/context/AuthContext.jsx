import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isSameDay } from 'date-fns';

export const AuthContext = createContext();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState(localStorage.getItem('tasks') || []);
  const [allTasks, setAllTasks] = useState(localStorage.getItem('allTasks') || []);
  const [todayTasks, setTodayTasks] = useState(localStorage.getItem('todayTasks') || []);

  const axiosAuth = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const profile = async () => {
    await axios.get("/sanctum/csrf-cookie");
    const user = await axiosAuth.get("/api/user");
    setUser(user.data);
    localStorage.setItem('user', user.data);
  };

  const login = async (data) => {
    await axios.get("/sanctum/csrf-cookie");
    const res = await axios.post("/api/login", data);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const register = async (data) => {
    await axios.get("/sanctum/csrf-cookie");
    const res = await axios.post("/api/register", data);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const logout = async () => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.post("/api/logout");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    localStorage.removeItem('allTasks');
    setToken(null);
    setUser(null);
    setTasks(null);
    setAllTasks(null);
    setTodayTasks(null);
    navigate("/");
  };

  const fetchTasks = async () => {
    await axios.get("/sanctum/csrf-cookie");
    const res = await axiosAuth.get('/api/tasks');
    setTasks(res.data);
    localStorage.setItem('tasks', res.data);
  };

  const fetchTask = async (id) => {
    await axios.get("/sanctum/csrf-cookie");
    const res = await axiosAuth.get(`/api/tasks/${id}`);
    setTasks(res.data);
    localStorage.setItem('tasks', res.data);
  };

  const fetchAllTasks = async () => {
    const res = await axios.get('/api/tasks/all');
    setAllTasks(res.data);
    localStorage.setItem('allTasks', res.data);
  };

  const addTask = async (form) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.post('/api/tasks', form);
    fetchTasks();
    fetchAllTasks();
  };

  const updateTask = async (id, form) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.put(`/api/tasks/${id}`, form);
    fetchTasks();
    fetchAllTasks();
  };

  const toggleTask = async (id, data) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.patch(`/api/tasks/${id}/toggle`, data);
    fetchTasks();
    fetchAllTasks();
  };

  const deleteTask = async (id) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.delete(`/api/tasks/${id}`);
    fetchTasks();
    fetchAllTasks();
  };

  useEffect(() => {
    if (token) {
      profile();
      fetchTasks();
      fetchAllTasks();
    }
  }, [token]);
  
  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    setTodayTasks(Array.isArray(tasks) ? tasks.filter(task => {
      return (
        isSameDay(new Date(task.dueDate), new Date())
      );
    }) : []);
    localStorage.setItem('todayTasks', todayTasks);
  }, [tasks]);

  return (
    <AuthContext.Provider value={{ user, token, tasks, todayTasks, allTasks, login, register, logout, fetchTasks, fetchTask, addTask, updateTask, toggleTask, deleteTask }}>
      {children}
    </AuthContext.Provider>
  );
}

