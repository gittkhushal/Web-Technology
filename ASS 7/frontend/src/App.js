import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CataloguePage from './pages/CataloguePage';
import './styles/index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirects to home if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/" />;
};

function AppContent() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Online Bookstore. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
        }

        .footer {
          background: #333;
          color: white;
          text-align: center;
          padding: 2rem;
          margin-top: 4rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .loading-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 1rem;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
