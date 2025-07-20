import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: import.meta.env.API_URL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
