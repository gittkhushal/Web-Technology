package com.bookstore.service;

import com.bookstore.dto.BookResponse;
import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Page<BookResponse> getAllBooks(Pageable pageable) {
        Page<Book> books = bookRepository.findByIsActive(true, pageable);
        return books.map(BookResponse::fromEntity);
    }

    public Optional<BookResponse> getBookById(String id) {
        return bookRepository.findById(id)
                .filter(b -> b.isAvailable())
                .map(BookResponse::fromEntity);
    }

    public Optional<BookResponse> getBookByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn)
                .filter(b -> b.isAvailable())
                .map(BookResponse::fromEntity);
    }

    public Page<BookResponse> searchBooks(String keyword, Pageable pageable) {
        Page<Book> books = bookRepository.searchBooks(keyword, pageable);
        return books.map(BookResponse::fromEntity);
    }

    public Page<BookResponse> getAvailableBooks(Pageable pageable) {
        Page<Book> books = bookRepository.findAvailableBooks(pageable);
        return books.map(BookResponse::fromEntity);
    }

    public Page<BookResponse> getBooksByCategory(String category, Pageable pageable) {
        Page<Book> books = bookRepository.findByCategoryAndIsActive(category, true, pageable);
        return books.map(BookResponse::fromEntity);
    }

    public List<BookResponse> getFeaturedBooks() {
        List<Book> books = bookRepository.findFeaturedBooks();
        return books.stream()
                .map(BookResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
