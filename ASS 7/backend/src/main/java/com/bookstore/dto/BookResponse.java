package com.bookstore.dto;

import com.bookstore.model.Book;

import java.math.BigDecimal;

public class BookResponse {
    private String id;
    private String title;
    private String author;
    private String isbn;
    private String description;
    private String category;
    private BigDecimal price;
    private Integer quantity;
    private String publisher;
    private Integer publicationYear;
    private String coverImageUrl;
    private Boolean available;

    public BookResponse() {}

    public BookResponse(String id, String title, String author, String isbn, String description, String category, BigDecimal price, Integer quantity, String publisher, Integer publicationYear, String coverImageUrl, Boolean available) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.coverImageUrl = coverImageUrl;
        this.available = available;
    }

    public static BookResponse fromEntity(Book book) {
        BookResponse response = new BookResponse();
        response.setId(book.getId());
        response.setTitle(book.getTitle());
        response.setAuthor(book.getAuthor());
        response.setIsbn(book.getIsbn());
        response.setDescription(book.getDescription());
        response.setCategory(book.getCategory());
        response.setPrice(book.getPrice());
        response.setQuantity(book.getQuantity());
        response.setPublisher(book.getPublisher());
        response.setPublicationYear(book.getPublicationYear());
        response.setCoverImageUrl(book.getCoverImageUrl());
        response.setAvailable(book.isAvailable());
        return response;
    }

    // Getters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public BigDecimal getPrice() { return price; }
    public Integer getQuantity() { return quantity; }
    public String getPublisher() { return publisher; }
    public Integer getPublicationYear() { return publicationYear; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public Boolean getAvailable() { return available; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setAuthor(String author) { this.author = author; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public void setDescription(String description) { this.description = description; }
    public void setCategory(String category) { this.category = category; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setPublisher(String publisher) { this.publisher = publisher; }
    public void setPublicationYear(Integer publicationYear) { this.publicationYear = publicationYear; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
    public void setAvailable(Boolean available) { this.available = available; }
}
