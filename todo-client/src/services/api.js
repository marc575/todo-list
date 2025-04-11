import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const csrf = () => api.get("/sanctum/csrf-cookie");

export const login = async (data) => {
  await csrf(); // Obligatoire avant login
  return api.post("/login", data);
};

export const register = async (data) => {
  await csrf();
  return api.post("/register", data);
};

export const logout = () => api.post("/logout");

export const getUser = () => api.get("/api/user");

export default api;
