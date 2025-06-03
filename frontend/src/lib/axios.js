import axios from "axios";
import e from "express";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5008/api" : "/api",
  withCredentials: true, // send cookies to the server
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  (error) => {
    return Promise.reject(error);
  };
});
export default axiosInstance;
