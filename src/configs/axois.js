import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";
const api = axios.create({
  baseURL, // replace with your API base URL
  timeout: 10000, // 10s timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Example: Add token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    // Allow multipart/form-data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data, // unwrap data
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
console.log(api);

export default api;
