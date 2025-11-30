import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (userData) => api.post('/users/register', userData),
    login: (credentials) => api.post('/users/login', credentials),
};

export const taskAPI = {
    create: (taskData) => api.post('/tasks', taskData),
    getAll: (filters = {}) => api.get('/tasks', { params: filters }),
    update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
    delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;