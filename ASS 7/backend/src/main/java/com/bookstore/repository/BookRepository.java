package com.bookstore.repository;

import com.bookstore.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
    Optional<Book> findByIsbn(String isbn);
    
    Page<Book> findByIsActive(Boolean isActive, Pageable pageable);
    
    @Query("SELECT b FROM Book b WHERE b.isActive = true AND b.quantity > 0")
    Page<Book> findAvailableBooks(Pageable pageable);
    
    @Query("SELECT b FROM Book b WHERE b.isActive = true AND (b.title ILIKE %:keyword% OR b.author ILIKE %:keyword% OR b.description ILIKE %:keyword%)")
    Page<Book> searchBooks(@Param("keyword") String keyword, Pageable pageable);
    
    Page<Book> findByCategoryAndIsActive(String category, Boolean isActive, Pageable pageable);
    
    @Query("SELECT b FROM Book b WHERE b.isActive = true ORDER BY b.createdAt DESC LIMIT 6")
    List<Book> findFeaturedBooks();
}
