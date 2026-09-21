import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BooksPage = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Self-Help'];

  useEffect(() => {
    loadBooks();
  }, [page, search, category]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      let url = `/books?page=${page}&limit=12`;
      
      if (search) {
        url = `/books/search?keyword=${search}&page=${page}&limit=12`;
      } else if (category) {
        url = `/books?page=${page}&limit=12&category=${category}`;
      }

      const response = await api.get(url);
      setBooks(response.data.books || []);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="books-page">
      <section className="books-header">
        <div className="container">
          <h1>Our Shop</h1>
          <p>Explore our curated collection of books</p>
        </div>
      </section>

      <div className="container books-container">
        <aside className="sidebar">
          <h3>Categories</h3>
          <div className="categories">
            <button 
              className={`cat-btn ${!category ? 'active' : ''}`}
              onClick={() => { setCategory(''); setPage(1); }}
            >
              All Books
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${category === cat ? 'active' : ''}`}
                onClick={() => { setCategory(cat); setPage(1); }}
              >
                {cat}
              </button>
            ))}
          </div>

          <h3 style={{marginTop: '2rem'}}>Search</h3>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="search-input"
          />
        </aside>

        <section className="books-main">
          {loading ? (
            <div className="loading"><i className="fas fa-spinner"></i> Loading...</div>
          ) : books.length > 0 ? (
            <>
              <div className="books-grid">
                {books.map(book => (
                  <div key={book.id} className="book-card">
                    <div className="book-image">
                      <img
                        src={book.coverImageUrl || 'https://via.placeholder.com/200x300?text=Book'}
                        alt={book.title}
                        onError={(e) => e.target.src = 'https://via.placeholder.com/200x300?text=Book'}
                      />
                    </div>
                    <div className="book-info">
                      <h4>{book.title}</h4>
                      <p className="author">{book.author}</p>
                      <p className="price">${book.price}</p>
                      <p className={`stock ${book.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {book.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button 
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
                <span>Page {page}</span>
                <button 
                  onClick={() => setPage(page + 1)}
                  disabled={books.length < 12}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="no-books">
              <i className="fas fa-book-open"></i>
              <p>No books found</p>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .books-page {
          min-height: 100vh;
          background: var(--color-light);
        }

        .books-header {
          background: var(--color-dark);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }

        .books-header h1 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .books-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          padding: 3rem 0;
        }

        .sidebar {
          background: white;
          padding: 2rem;
          border-radius: 4px;
          height: fit-content;
        }

        .sidebar h3 {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: var(--color-dark);
          font-weight: 600;
        }

        .categories {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .cat-btn {
          background: none;
          border: none;
          text-align: left;
          padding: 0.5rem 0;
          color: #666;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.95rem;
        }

        .cat-btn:hover,
        .cat-btn.active {
          color: var(--color-accent);
          font-weight: 600;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .books-main {
          background: white;
          padding: 2rem;
          border-radius: 4px;
        }

        .loading {
          text-align: center;
          padding: 4rem;
          color: #666;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .book-card {
          background: #fafafa;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .book-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        .book-image {
          width: 100%;
          aspect-ratio: 180/260;
          overflow: hidden;
          background: #ddd;
        }

        .book-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .book-info {
          padding: 1rem;
        }

        .book-info h4 {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .author {
          color: #999;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .price {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }

        .stock {
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          display: inline-block;
        }

        .stock.in-stock {
          background: #d4edda;
          color: #155724;
        }

        .stock.out-of-stock {
          background: #f8d7da;
          color: #721c24;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 2rem;
          align-items: center;
          padding: 2rem;
        }

        .no-books {
          text-align: center;
          padding: 4rem;
        }

        .no-books i {
          font-size: 3rem;
          color: #ddd;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .books-container {
            grid-template-columns: 1fr;
          }

          .sidebar {
            display: none;
          }

          .books-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
          }
        }
      `}</style>
    </main>
  );
};

export default BooksPage;
