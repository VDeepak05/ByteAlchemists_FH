import axios from 'axios';

/**
 * Centralized API client for all HTTP requests
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || 'An error occurred';
            console.error('API Error:', errorMessage);

            // Handle specific status codes
            if (error.response.status === 401) {
                // Unauthorized - clear auth and redirect to login
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        } else {
            // Error in request setup
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
