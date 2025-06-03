import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5008/api" : "/api",
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "none";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
