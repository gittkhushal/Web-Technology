const API_BASE = 'http://localhost:5000/api';

// Storage for auth token
const tokenKey = 'bookstore_token';
const userKey = 'bookstore_user';

// Helper function to get headers with auth token
function getHeaders() {
  const token = localStorage.getItem(tokenKey);
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Auth API calls
const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem(tokenKey, data.token);
      localStorage.setItem(userKey, JSON.stringify(data.user));
    }
    return { ok: response.ok, data };
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem(tokenKey, data.token);
      localStorage.setItem(userKey, JSON.stringify(data.user));
    }
    return { ok: response.ok, data };
  },

  logout: () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  }
};

// Books API calls
const booksAPI = {
  getAll: async (page = 1, limit = 10, category = '', search = '') => {
    let url = `${API_BASE}/books?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    if (search) url += `&search=${search}`;

    const response = await fetch(url, {
      headers: getHeaders()
    });
    return await response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/books/${id}`, {
      headers: getHeaders()
    });
    return await response.json();
  },

  create: async (bookData) => {
    const response = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookData)
    });
    return { ok: response.ok, data: await response.json() };
  },

  update: async (id, bookData) => {
    const response = await fetch(`${API_BASE}/books/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(bookData)
    });
    return { ok: response.ok, data: await response.json() };
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/books/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return { ok: response.ok, data: await response.json() };
  },

  getByCategory: async (category) => {
    const response = await fetch(`${API_BASE}/books/category/${category}`, {
      headers: getHeaders()
    });
    return await response.json();
  }
};

// Users API calls
const usersAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE}/users/profile`, {
      headers: getHeaders()
    });
    return { ok: response.ok, data: await response.json() };
  },

  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE}/users/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    return { ok: response.ok, data: await response.json() };
  },

  changePassword: async (passwordData) => {
    const response = await fetch(`${API_BASE}/users/change-password`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(passwordData)
    });
    return { ok: response.ok, data: await response.json() };
  }
};

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem(tokenKey);
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
}

// Update current user in localStorage
function updateCurrentUser(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
}
