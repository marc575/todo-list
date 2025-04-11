import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState(localStorage.getItem('tasks') || '[]');

  const axiosAuth = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    axiosAuth.get("/api/user").then((res) => setUser(res.data)).catch(() => setUser(null));
  }, []);

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
    setToken(null);
    setUser(null);
    setTasks(null);
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

  const addTask = async (form) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.post('/api/tasks', form);
    fetchTasks();
  };

  const updateTask = async (id, form) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.put(`/api/tasks/${id}`, form);
    fetchTasks();
  };

  const toggleTask = async (id, data) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.patch(`/api/tasks/${id}/toggle`, data);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.get("/sanctum/csrf-cookie");
    await axiosAuth.delete(`/api/tasks/${id}`);
    fetchTasks();
  };


  useEffect(() => {
    if (token) {
      profile();
      fetchTasks();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, tasks, login, register, logout, fetchTasks, fetchTask, addTask, updateTask, toggleTask, deleteTask }}>
      {children}
    </AuthContext.Provider>
  );
}

