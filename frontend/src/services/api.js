import axios from "axios";

const apiBaseUrl = (() => {
  const configuredUrl = process.env.REACT_APP_API_URL;

  if (!configuredUrl) {
    return "/api";
  }

  return configuredUrl.endsWith("/api") ? configuredUrl : `${configuredUrl.replace(/\/$/, "")}/api`;
})();

const API = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export default API;