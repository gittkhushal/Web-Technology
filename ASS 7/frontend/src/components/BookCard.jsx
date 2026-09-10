import React from "react";

export default function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        {book.coverImageUrl ? <img src={book.coverImageUrl} alt={book.title} /> : <span>{book.genre}</span>}
      </div>
      <div className="book-details">
        <p className="book-genre">{book.genre}</p>
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-meta">
          <p className="book-price">₹{book.price}</p>
          <p className="book-stock">{book.stockQuantity > 0 ? "In stock" : "Sold out"}</p>
        </div>
      </div>
    </article>
  );
}
