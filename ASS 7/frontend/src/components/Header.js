import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <i className="fas fa-book"></i>
            <span>BookStore</span>
          </Link>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/catalogue" className="nav-link">Catalogue</Link>
          
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Hi, {user?.firstName}!</span>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-register">Register</Link>
            </>
          )}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1rem 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .logo a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: bold;
          transition: transform 0.3s;
        }

        .logo a:hover {
          transform: scale(1.05);
        }

        .logo i {
          font-size: 1.8rem;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          font-size: 1rem;
        }

        .nav-link:hover {
          opacity: 0.8;
        }

        .btn-register {
          background: white;
          color: #667eea;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-register:hover {
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: 1px solid white;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .user-greeting {
          color: white;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .nav {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: #667eea;
            flex-direction: column;
            gap: 1rem;
            padding: 2rem;
            display: none;
          }

          .nav.active {
            display: flex;
          }

          .header-container {
            padding: 0 1rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
