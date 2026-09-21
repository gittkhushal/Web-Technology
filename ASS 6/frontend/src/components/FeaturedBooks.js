import React from 'react';

const FeaturedBooks = ({ books, loading }) => {
  return (
    <section className="featured">
      <div className="container">
        <h2>Featured Finds</h2>
        <p className="subtitle">Check out these curated pleasures and add a title new to your shelf</p>

        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner"></i> Loading...
          </div>
        ) : books.length > 0 ? (
          <div className="books-grid">
            {books.slice(0, 3).map(book => (
              <div key={book.id} className="book-item">
                <div className="book-image">
                  <img 
                    src={book.coverImageUrl || 'https://via.placeholder.com/250x350?text=Book'}
                    alt={book.title}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/250x350?text=Book'}
                  />
                </div>
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <p className="price">${book.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-books">No featured books available</p>
        )}
      </div>

      <style jsx>{`
        .featured {
          background: #f5e6d3;
          padding: 6rem 0;
        }

        .featured h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--color-dark);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .subtitle {
          color: #666;
          margin-bottom: 3rem;
          font-size: 1rem;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.1rem;
          color: #666;
        }

        .loading i {
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }

        .book-item {
          text-align: center;
        }

        .book-image {
          width: 100%;
          aspect-ratio: 250/350;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background: #ddd;
        }

        .book-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .book-item h3 {
          font-size: 1.1rem;
          color: var(--color-dark);
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .author {
          color: #999;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .price {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-accent);
        }

        .no-books {
          text-align: center;
          color: #666;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .featured {
            padding: 3rem 0;
          }

          .featured h2 {
            font-size: 2rem;
          }

          .books-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedBooks;
