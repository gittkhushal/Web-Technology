package com.bookstore.service;

import com.bookstore.dto.BookDTO;
import com.bookstore.entity.Book;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        return toDTO(book);
    }

    public List<BookDTO> search(String keyword) {
        return bookRepository.search(keyword).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public BookDTO createBook(BookDTO dto) {
        Book book = toEntity(dto);
        return toDTO(bookRepository.save(book));
    }

    public BookDTO updateBook(Long id, BookDTO dto) {
        Book existing = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));

        existing.setTitle(dto.getTitle());
        existing.setAuthor(dto.getAuthor());
        existing.setGenre(dto.getGenre());
        existing.setPrice(dto.getPrice());
        existing.setStockQuantity(dto.getStockQuantity());
        existing.setIsbn(dto.getIsbn());
        existing.setDescription(dto.getDescription());
        existing.setCoverImageUrl(dto.getCoverImageUrl());

        return toDTO(bookRepository.save(existing));
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    private BookDTO toDTO(Book book) {
        return BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .genre(book.getGenre())
                .price(book.getPrice())
                .stockQuantity(book.getStockQuantity())
                .isbn(book.getIsbn())
                .description(book.getDescription())
                .coverImageUrl(book.getCoverImageUrl())
                .build();
    }

    private Book toEntity(BookDTO dto) {
        return Book.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .genre(dto.getGenre())
                .price(dto.getPrice())
                .stockQuantity(dto.getStockQuantity())
                .isbn(dto.getIsbn())
                .description(dto.getDescription())
                .coverImageUrl(dto.getCoverImageUrl())
                .build();
    }
}
