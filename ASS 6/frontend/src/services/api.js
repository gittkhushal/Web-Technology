import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Books API calls
export const booksAPI = {
  getBooks: (page = 1, limit = 12) => api.get(`/books?page=${page}&limit=${limit}`),
  getBook: (id) => api.get(`/books/${id}`),
  searchBooks: (keyword, page = 1, limit = 12) => 
    api.get(`/books/search?keyword=${keyword}&page=${page}&limit=${limit}`),
  getBooksByCategory: (category, page = 1, limit = 12) => 
    api.get(`/books?page=${page}&limit=${limit}&category=${category}`),
  getFeaturedBooks: () => api.get('/books/featured')
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (currentPassword, newPassword) => 
    api.put('/users/change-password', { currentPassword, newPassword })
};

// Cart API calls (if needed)
export const cartAPI = {
  addToCart: (bookId, quantity = 1) => api.post('/cart', { bookId, quantity }),
  getCart: () => api.get('/cart'),
  removeFromCart: (bookId) => api.delete(`/cart/${bookId}`),
  checkout: (paymentData) => api.post('/cart/checkout', paymentData)
};

// Order API calls (if needed)
export const orderAPI = {
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`)
};

export default api;
