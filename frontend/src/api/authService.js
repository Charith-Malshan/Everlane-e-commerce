import axiosInstance from "./axios";

const authService = {
    // Register new user
    register: async (userData) => {
        const response = await axiosInstance.post("/users/register", userData);
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await axiosInstance.post("/users/login", credentials);
        return response.data;
    },

    // Store token with remember me option
    setToken: (token, remember = true) => {
        if (remember) {
            localStorage.setItem("token", token);
            localStorage.setItem(
                "token_expiry",
                String(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
            );
        } else {
            sessionStorage.setItem("token", token);
        }
    },

    // Remove token from both storages
    removeToken: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry");
        sessionStorage.removeItem("token");
    },

    // Get token from either storage
    getToken: () => {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");
        const expiry = localStorage.getItem("token_expiry");

        // Check session storage first
        if (sessionToken) return true;

        // Check local storage with expiry
        if (localToken && expiry) {
            return Date.now() < parseInt(expiry);
        }

        return false;
    }
};

export default authService;