let currentPage = 1;
const booksPerPage = 12;
let currentCategory = '';
let currentSearch = '';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateNavigation();
  loadBooks();
});

// Update navigation based on auth status
function updateNavigation() {
  const navAuth = document.getElementById('navAuth');
  const navProfile = document.getElementById('navProfile');

  if (isAuthenticated()) {
    const user = getCurrentUser();
    navAuth.innerHTML = `
      <span style="color: white;">Welcome, ${user.firstName}!</span>
      <button class="btn btn-danger" onclick="handleLogout()">Logout</button>
    `;
    navProfile.classList.remove('hidden');
  } else {
    navProfile.classList.add('hidden');
  }
}

// Load books
async function loadBooks() {
  try {
    const data = await booksAPI.getAll(currentPage, booksPerPage, currentCategory, currentSearch);
    displayBooks(data.books);
    displayPagination(data.totalPages);
  } catch (error) {
    console.error('Error loading books:', error);
    document.getElementById('booksGrid').innerHTML = 
      '<p style="grid-column: 1/-1; text-align: center;">Error loading books</p>';
  }
}

// Display books
function displayBooks(books) {
  const container = document.getElementById('booksGrid');

  if (!books || books.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No books found</p>';
    return;
  }

  container.innerHTML = books.map(book => `
    <div class="book-card">
      <div class="book-image">${book.imageUrl ? `<img src="${book.imageUrl}" alt="${book.title}">` : '📖'}</div>
      <div class="book-content">
        <h3 class="book-title">${escapeHtml(book.title)}</h3>
        <p class="book-author">by ${escapeHtml(book.author)}</p>
        <span class="book-category">${escapeHtml(book.category)}</span>
        <p class="book-price">$${parseFloat(book.price).toFixed(2)}</p>
        <p class="book-description">${book.description ? escapeHtml(book.description.substring(0, 80)) + '...' : 'No description'}</p>
        <div class="book-actions">
          <button class="btn btn-primary" onclick="viewBook(${book.id})">View</button>
          ${isAuthenticated() ? `<button class="btn btn-secondary" onclick="addToCart(${book.id})">Cart</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// Display pagination
function displayPagination(totalPages) {
  const container = document.getElementById('pagination');

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '';
  
  if (currentPage > 1) {
    html += `<button onclick="changePage(${currentPage - 1})">Previous</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<button class="active">${i}</button>`;
    } else if (i >= currentPage - 2 && i <= currentPage + 2) {
      html += `<button onclick="changePage(${i})">${i}</button>`;
    }
  }

  if (currentPage < totalPages) {
    html += `<button onclick="changePage(${currentPage + 1})">Next</button>`;
  }

  container.innerHTML = html;
}

// Search books
function searchBooks() {
  currentPage = 1;
  currentSearch = document.getElementById('searchInput').value;
  currentCategory = document.getElementById('categoryFilter').value;
  loadBooks();
}

// Change page
function changePage(page) {
  currentPage = page;
  loadBooks();
  window.scrollTo(0, 0);
}

// View book details
function viewBook(bookId) {
  window.location.href = `/book-details.html?id=${bookId}`;
}

// Add to cart
function addToCart(bookId) {
  alert('Added to cart! (This is a demo)');
}

// Logout
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    authAPI.logout();
    updateNavigation();
    window.location.href = '/';
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Enter key to search
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchBooks();
      }
    });
  }
});
