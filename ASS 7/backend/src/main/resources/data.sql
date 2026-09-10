-- Sample books (runs on startup because ddl-auto=update keeps existing rows;
-- delete this file or clear the table once you have real data)
INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'Clean Code', 'Robert C. Martin', 'Programming', 799.00, 25, '9780132350884',
       'A handbook of agile software craftsmanship.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780132350884');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'Atomic Habits', 'James Clear', 'Self-Help', 499.00, 40, '9780735211292',
       'An easy and proven way to build good habits and break bad ones.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780735211292');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 350.00, 15, '9780547928227',
       'A fantasy novel about Bilbo Baggins'' unexpected journey.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780547928227');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'The Midnight Library', 'Matt Haig', 'Contemporary Fiction', 599.00, 18, '9780525559498',
       'A life-affirming novel about choices, regrets, and all the lives we might live.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780525559498');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'Before the Coffee Gets Cold', 'Toshikazu Kawaguchi', 'Magical Realism', 449.00, 22, '9781335430993',
       'A quiet Tokyo cafe offers visitors the chance to revisit one moment from the past.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9781335430993');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'Klara and the Sun', 'Kazuo Ishiguro', 'Literary Fiction', 699.00, 12, '9780593318171',
       'An unforgettable story of love, hope, and what it means to be human.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780593318171');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'Tomorrow, and Tomorrow, and Tomorrow', 'Gabrielle Zevin', 'Contemporary Fiction', 799.00, 16, '9780593321201',
       'A story of friendship, ambition, and the creative world of video games.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780593321201');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'The Song of Achilles', 'Madeline Miller', 'Historical Fiction', 549.00, 20, '9780062060624',
       'A lyrical reimagining of the life and love of Patroclus and Achilles.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780062060624');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'Braiding Sweetgrass', 'Robin Wall Kimmerer', 'Nature', 649.00, 14, '9781571313560',
       'Indigenous wisdom, scientific knowledge, and the teachings of plants.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9781571313560');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'A Psalm for the Wild-Built', 'Becky Chambers', 'Science Fiction', 399.00, 19, '9781250236210',
       'A gentle, hopeful journey through a world learning to rest and reconnect.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9781250236210');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'The Thursday Murder Club', 'Richard Osman', 'Mystery', 579.00, 17, '9781984880987',
       'Four friends in a retirement village investigate an unexpected murder.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9781984880987');

INSERT INTO books (title, author, genre, price, stock_quantity, isbn, description, cover_image_url)
SELECT 'Lessons in Chemistry', 'Bonnie Garmus', 'Historical Fiction', 729.00, 13, '9780385547345',
       'A fiercely funny novel about a brilliant scientist refusing to be underestimated.', ''
WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = '9780385547345');
