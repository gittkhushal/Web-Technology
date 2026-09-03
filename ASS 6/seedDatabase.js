const db = require('./config/database');

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    description: 'A classic American novel set in the Jazz Age.',
    category: 'Fiction',
    price: 12.99,
    quantity: 50,
    publisher: 'Scribner',
    publicationYear: 1925
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0061120084',
    description: 'A gripping tale of racial injustice and childhood innocence.',
    category: 'Fiction',
    price: 14.99,
    quantity: 45,
    publisher: 'J.B. Lippincott',
    publicationYear: 1960
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    description: 'A dystopian novel about totalitarianism.',
    category: 'Fiction',
    price: 13.99,
    quantity: 55,
    publisher: 'Penguin',
    publicationYear: 1949
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0316769174',
    description: 'A story of teenage rebellion and alienation.',
    category: 'Fiction',
    price: 11.99,
    quantity: 40,
    publisher: 'Little, Brown',
    publicationYear: 1951
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0141439518',
    description: 'A romantic novel about love and social class.',
    category: 'Fiction',
    price: 10.99,
    quantity: 60,
    publisher: 'Penguin Classics',
    publicationYear: 1813
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    description: 'A brief history of humankind from the Stone Age to the present.',
    category: 'Non-Fiction',
    price: 18.99,
    quantity: 35,
    publisher: 'Harper',
    publicationYear: 2011
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '978-0374533557',
    description: 'An exploration of the two systems that drive the way we think.',
    category: 'Non-Fiction',
    price: 17.99,
    quantity: 30,
    publisher: 'Farrar, Straus and Giroux',
    publicationYear: 2011
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '978-0553380163',
    description: 'A landmark volume in science writing.',
    category: 'Science',
    price: 16.99,
    quantity: 25,
    publisher: 'Bantam',
    publicationYear: 1988
  },
  {
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    isbn: '978-0199291151',
    description: 'A revolutionary look at evolution.',
    category: 'Science',
    price: 15.99,
    quantity: 28,
    publisher: 'Oxford University Press',
    publicationYear: 1976
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    description: 'Tiny changes, remarkable results.',
    category: 'Self-Help',
    price: 16.99,
    quantity: 70,
    publisher: 'Avery',
    publicationYear: 2018
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    isbn: '978-0743269513',
    description: 'Powerful lessons in personal change.',
    category: 'Self-Help',
    price: 15.99,
    quantity: 50,
    publisher: 'Free Press',
    publicationYear: 1989
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    description: 'A handbook of agile software craftsmanship.',
    category: 'Technology',
    price: 32.99,
    quantity: 20,
    publisher: 'Prentice Hall',
    publicationYear: 2008
  }
];

async function seedDatabase() {
  try {
    await db.sequelize.sync({ force: false });
    console.log('Database synced!');

    // Check if books already exist
    const bookCount = await db.Book.count();
    if (bookCount > 0) {
      console.log(`Database already has ${bookCount} books. Skipping seed.`);
      process.exit(0);
    }

    // Create books
    await db.Book.bulkCreate(sampleBooks);
    console.log(`✓ Seeded ${sampleBooks.length} books successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
