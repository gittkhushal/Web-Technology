import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <i className="fas fa-book"></i>
          <span>The Reading Room</span>
        </Link>

        <nav className={`nav ${mobileOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/books" className="nav-link" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileOpen(false)}>About</Link>
          
          {user ? (
            <>
              <span className="user-name">{user.firstName}</span>
              <Link to="/profile" className="nav-link" onClick={() => setMobileOpen(false)}>Profile</Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="nav-link btn btn-primary" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </>
          )}
        </nav>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <style jsx>{`
        .header {
          background: white;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-dark);
          text-decoration: none;
        }

        .logo i {
          font-size: 1.5rem;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: var(--color-dark);
          font-size: 0.95rem;
          font-weight: 500;
          transition: opacity 0.3s;
          background: none;
          padding: 0;
        }

        .nav-link:hover {
          opacity: 0.7;
        }

        .user-name {
          color: var(--color-accent);
          font-weight: 600;
        }

        .logout-btn {
          color: #e74c3c;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--color-dark);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 1rem 1.5rem;
          }

          .mobile-toggle {
            display: block;
          }

          .nav {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            gap: 1rem;
            padding: 2rem;
            display: none;
            border-top: 1px solid #eee;
          }

          .nav.active {
            display: flex;
          }

          .logo span {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
