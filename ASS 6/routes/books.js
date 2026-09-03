const express = require('express');
const router = express.Router();
const db = require('../config/database');
const authMiddleware = require('../middleware/auth');
const Book = db.Book;

// Get all books with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;

    let where = {};
    if (category) where.category = category;
    if (search) {
      where = {
        ...where,
        [db.Sequelize.Op.or]: [
          { title: { [db.Sequelize.Op.iLike]: `%${search}%` } },
          { author: { [db.Sequelize.Op.iLike]: `%${search}%` } }
        ]
      };
    }

    const offset = (page - 1) * limit;
    const { count, rows } = await Book.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      books: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Create book (admin/authenticated users)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, author, isbn, description, category, price, quantity, publisher, publicationYear, imageUrl } = req.body;

    // Validation
    if (!title || !author || !isbn || !price) {
      return res.status(400).json({ error: 'Title, author, ISBN, and price are required' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Price must be a valid positive number' });
    }

    // Check duplicate ISBN
    const existingBook = await Book.findOne({ where: { isbn } });
    if (existingBook) {
      return res.status(400).json({ error: 'Book with this ISBN already exists' });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      description,
      category: category || 'General',
      price,
      quantity: quantity || 0,
      publisher,
      publicationYear,
      imageUrl,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Update book (authenticated user/owner)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check authorization (owner or admin)
    if (book.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this book' });
    }

    const { title, author, description, category, price, quantity, publisher, publicationYear, imageUrl } = req.body;

    if (price && (isNaN(price) || price <= 0)) {
      return res.status(400).json({ error: 'Price must be a valid positive number' });
    }

    await book.update({
      title: title || book.title,
      author: author || book.author,
      description: description || book.description,
      category: category || book.category,
      price: price !== undefined ? price : book.price,
      quantity: quantity !== undefined ? quantity : book.quantity,
      publisher: publisher || book.publisher,
      publicationYear: publicationYear || book.publicationYear,
      imageUrl: imageUrl || book.imageUrl
    });

    res.status(200).json({
      message: 'Book updated successfully',
      book
    });
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete book (authenticated user/owner)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check authorization
    if (book.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this book' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Get books by category
router.get('/category/:category', async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { category: req.params.category },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(books);
  } catch (err) {
    console.error('Error fetching books by category:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;
