import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { booksAPI } from '../services/api';

const HomePage = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getFeaturedBooks();
      setFeaturedBooks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load featured books');
      console.error('Error loading featured books:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Next Great Read</h1>
          <p>Hundreds of hand-picked titles are waiting—let's dive in together.</p>
          <Link to="/catalogue" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop" 
            alt="Bookstore"
          />
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="featured-section">
        <h2>Featured Books</h2>
        
        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : featuredBooks.length > 0 ? (
          <div className="books-grid">
            {featuredBooks.slice(0, 6).map(book => (
              <div key={book.id} className="book-card">
                <div className="book-image">
                  <img
                    src={book.coverImageUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
                    alt={book.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                    }}
                  />
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">by {book.author}</p>
                  <p className="category">{book.category}</p>
                  <p className="price">${book.price}</p>
                  <p className={`availability ${book.isAvailable ? 'available' : 'unavailable'}`}>
                    {book.isAvailable ? 'Available' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-books">No featured books available</p>
        )}
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore?</h2>
          <p>Browse our complete catalog of thousands of books</p>
          <Link to="/catalogue" className="btn btn-primary">
            View Catalogue
          </Link>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }

        /* Hero Section */
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 500px;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-image {
          height: 100%;
          min-height: 400px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Featured Section */
        .featured-section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .featured-section h2 {
          font-size: 2.5rem;
          margin-bottom: 3rem;
          text-align: center;
          color: #333;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
        }

        .book-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .book-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .book-image {
          width: 100%;
          height: 250px;
          overflow: hidden;
          background: #f5f5f5;
        }

        .book-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .book-info {
          padding: 1.5rem;
        }

        .book-info h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #333;
          line-height: 1.3;
        }

        .author {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .category {
          color: #667eea;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .price {
          font-size: 1.3rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .availability {
          font-size: 0.85rem;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          display: inline-block;
        }

        .availability.available {
          background: #d4edda;
          color: #155724;
        }

        .availability.unavailable {
          background: #f8d7da;
          color: #721c24;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
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

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .no-books {
          text-align: center;
          color: #666;
          padding: 2rem;
          font-size: 1.1rem;
        }

        /* CTA Section */
        .cta-section {
          background: #f5f5f5;
          padding: 4rem 2rem;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .cta-content p {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            padding: 2rem 1rem;
            min-height: auto;
          }

          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .featured-section {
            padding: 2rem 1rem;
          }

          .featured-section h2 {
            font-size: 1.8rem;
          }

          .books-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
