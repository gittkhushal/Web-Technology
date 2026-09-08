import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Books API
export const booksAPI = {
  getAllBooks: (page = 0, size = 10) => 
    api.get(`/books?page=${page}&size=${size}`),
  getBookById: (id) => api.get(`/books/${id}`),
  searchBooks: (keyword, page = 0, size = 10) => 
    api.get(`/books/search?keyword=${keyword}&page=${page}&size=${size}`),
  getBooksByCategory: (category, page = 0, size = 10) => 
    api.get(`/books/category/${category}?page=${page}&size=${size}`),
  getFeaturedBooks: () => api.get('/books/featured'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (currentPassword, newPassword) => 
    api.put(`/user/change-password?currentPassword=${currentPassword}&newPassword=${newPassword}`),
};

export default api;
