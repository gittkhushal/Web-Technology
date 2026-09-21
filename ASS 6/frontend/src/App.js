import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedBooks from './components/FeaturedBooks';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    // Load featured books
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/books?page=1&limit=10');
      setBooks(response.data.books || []);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route 
            path="/" 
            element={<HomePage user={user} books={books} loading={loading} />} 
          />
          <Route 
            path="/books" 
            element={<BooksPage user={user} />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <RegisterPage onRegister={handleLogin} />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="*" 
            element={<Navigate to="/" />} 
          />
        </Routes>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 The Reading Room. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .footer {
          background: var(--color-dark);
          color: white;
          text-align: center;
          padding: 2rem;
          margin-top: 4rem;
        }
      `}</style>
    </Router>
  );
}

export default App;
