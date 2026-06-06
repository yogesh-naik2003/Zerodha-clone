import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      const loginUrl =
        process.env.REACT_APP_LOGIN_URL || "http://localhost:3000/login";

      if (!window.location.href.includes(loginUrl)) {
        window.location.href = loginUrl;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
