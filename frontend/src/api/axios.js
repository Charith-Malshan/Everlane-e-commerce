import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api" || "/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

// Request interceptor - Add token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        // Check both storages for token
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear tokens on unauthorized
            localStorage.removeItem("token");
            localStorage.removeItem("token_expiry");
            sessionStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;