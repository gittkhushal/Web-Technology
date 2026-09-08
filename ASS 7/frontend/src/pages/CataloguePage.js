import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

const CataloguePage = () => {
  const [books, setBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const pageSize = 12;
  const categories = ['All', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Self-Help', 'Technology'];

  useEffect(() => {
    loadBooks();
  }, [currentPage, selectedCategory, searchKeyword]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError('');

      let response;
      if (searchKeyword) {
        response = await booksAPI.searchBooks(searchKeyword, currentPage, pageSize);
      } else if (selectedCategory && selectedCategory !== 'All') {
        response = await booksAPI.getBooksByCategory(selectedCategory, currentPage, pageSize);
      } else {
        response = await booksAPI.getAllBooks(currentPage, pageSize);
      }

      setBooks(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError('Failed to load books');
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setSelectedCategory('');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === 'All' ? '' : category);
    setCurrentPage(0);
    setSearchKeyword('');
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="catalogue-page">
      {/* Header */}
      <div className="catalogue-header">
        <h1>Book Catalogue</h1>
        <p>Browse our complete collection of books</p>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <i className="fas fa-search"></i> Search
          </button>
        </form>

        <div className="category-filter">
          <h3>Categories</h3>
          <div className="category-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${(!selectedCategory && cat === 'All') || selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      {/* Books Grid */}
      <div className="catalogue-content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading books...</p>
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="books-grid">
              {books.map(book => (
                <div key={book.id} className="book-card">
                  <div className="book-image">
                    <img
                      src={book.coverImageUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
                      alt={book.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                      }}
                    />
                    {!book.isAvailable && <div className="out-of-stock">Out of Stock</div>}
                  </div>
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="author">by {book.author}</p>
                    <p className="description">{book.description?.substring(0, 60)}...</p>
                    <p className="category">{book.category}</p>
                    <p className="price">${book.price}</p>
                    <p className={`availability ${book.isAvailable ? 'available' : 'unavailable'}`}>
                      {book.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  className="btn-pagination"
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>

                <div className="page-info">
                  Page {currentPage + 1} of {totalPages}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className="btn-pagination"
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-books">
            <i className="fas fa-book-open"></i>
            <p>No books found</p>
            <p className="subtitle">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .catalogue-page {
          min-height: 100vh;
          padding: 2rem 0;
        }

        .catalogue-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .catalogue-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .catalogue-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .search-filter-section {
          max-width: 1200px;
          margin: 0 auto 3rem;
          padding: 0 2rem;
        }

        .search-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .search-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .category-filter h3 {
          margin-bottom: 1rem;
          color: #333;
        }

        .category-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #ddd;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
        }

        .category-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .category-btn.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .catalogue-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
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

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .book-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
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
          position: relative;
        }

        .book-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .out-of-stock {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
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

        .description {
          color: #999;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
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

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin: 3rem 0;
          padding: 2rem;
          background: #f5f5f5;
          border-radius: 8px;
        }

        .btn-pagination {
          padding: 0.75rem 1.5rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-pagination:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-pagination:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          color: #333;
          font-weight: 600;
        }

        .no-books {
          text-align: center;
          padding: 4rem 2rem;
        }

        .no-books i {
          font-size: 4rem;
          color: #ddd;
          margin-bottom: 1rem;
          display: block;
        }

        .no-books p {
          color: #666;
          font-size: 1.2rem;
        }

        .no-books .subtitle {
          color: #999;
          font-size: 1rem;
          margin-top: 0.5rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .catalogue-header h1 {
            font-size: 1.8rem;
          }

          .search-form {
            flex-direction: column;
          }

          .category-buttons {
            gap: 0.5rem;
          }

          .category-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }

          .books-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }

          .pagination {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CataloguePage;
