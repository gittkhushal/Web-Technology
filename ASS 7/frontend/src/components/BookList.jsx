import React, { useEffect, useState } from "react";
import { getAllBooks } from "../api/bookService";
import BookCard from "./BookCard";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async (searchTerm = "") => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getAllBooks(searchTerm);
      setBooks(data);
    } catch (err) {
      setError("Could not load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(keyword);
  };

  if (loading) return <p className="status-message">Loading the shelves...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="books-area">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          placeholder="Search by title, author, or genre"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Find a book</button>
      </form>

      <div className="book-grid">
        {books.length === 0 ? (
          <p className="status-message">No books found. Try another search.</p>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
}
