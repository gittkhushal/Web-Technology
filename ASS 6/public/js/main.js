let currentPage = 1;
const booksPerPage = 10;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateNavigation();
  loadFeaturedBooks();
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

// Load featured books
async function loadFeaturedBooks() {
  try {
    const data = await booksAPI.getAll(currentPage, booksPerPage);
    displayBooks(data.books);
    displayPagination(data.totalPages);
  } catch (error) {
    console.error('Error loading books:', error);
    document.getElementById('featuredBooks').innerHTML = 
      '<p style="grid-column: 1/-1; text-align: center;">Error loading books</p>';
  }
}

// Display books
function displayBooks(books) {
  const container = document.getElementById('featuredBooks');

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
        <p class="book-description">${book.description ? escapeHtml(book.description.substring(0, 100)) + '...' : 'No description'}</p>
        <div class="book-actions">
          <button class="btn btn-primary" onclick="viewBook(${book.id})">View Details</button>
          ${isAuthenticated() ? `<button class="btn btn-secondary" onclick="addToCart(${book.id})">Add to Cart</button>` : ''}
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

// Change page
function changePage(page) {
  currentPage = page;
  loadFeaturedBooks();
  window.scrollTo(0, 0);
}

// View book details
function viewBook(bookId) {
  // Redirect to book details page
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
