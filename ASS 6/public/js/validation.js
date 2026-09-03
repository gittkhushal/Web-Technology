// Form validation utilities

const validation = {
  // Validate email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password
  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

  // Validate name
  isValidName: (name) => {
    return name && name.trim().length >= 2;
  },

  // Validate phone
  isValidPhone: (phone) => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
  },

  // Validate price
  isValidPrice: (price) => {
    return !isNaN(price) && parseFloat(price) > 0;
  },

  // Validate ISBN
  isValidISBN: (isbn) => {
    return isbn && isbn.trim().length >= 5;
  },

  // Clear field error
  clearFieldError: (fieldId) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  },

  // Show field error
  showFieldError: (fieldId, message) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  },

  // Show alert
  showAlert: (message, type = 'error') => {
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
      const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
      alertContainer.innerHTML = `<div class="alert ${alertClass}">${escapeHtml(message)}</div>`;
      // Auto-hide success alerts after 3 seconds
      if (type === 'success') {
        setTimeout(() => {
          alertContainer.innerHTML = '';
        }, 3000);
      }
    }
  },

  // Validate registration form
  validateRegistration: (data) => {
    const errors = {};

    if (!data.firstName || data.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    if (!data.email || !validation.isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!validation.isValidPassword(data.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (data.phoneNumber && !validation.isValidPhone(data.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    return errors;
  },

  // Validate login form
  validateLogin: (data) => {
    const errors = {};

    if (!data.email || !validation.isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    }

    return errors;
  },

  // Validate book form
  validateBookForm: (data) => {
    const errors = {};

    if (!data.title || data.title.trim().length < 1) {
      errors.title = 'Title is required';
    }

    if (!data.author || data.author.trim().length < 2) {
      errors.author = 'Author name must be at least 2 characters';
    }

    if (!data.isbn || !validation.isValidISBN(data.isbn)) {
      errors.isbn = 'Invalid ISBN format';
    }

    if (!data.price || !validation.isValidPrice(data.price)) {
      errors.price = 'Price must be a valid positive number';
    }

    if (data.publicationYear && (isNaN(data.publicationYear) || data.publicationYear < 1000 || data.publicationYear > 2100)) {
      errors.publicationYear = 'Invalid publication year';
    }

    return errors;
  },

  // Display field errors
  displayErrors: (errors) => {
    // Clear all errors first
    Object.keys(errors).forEach(field => {
      validation.clearFieldError(field);
    });

    // Show errors
    Object.keys(errors).forEach(field => {
      validation.showFieldError(field, errors[field]);
    });

    return Object.keys(errors).length === 0;
  }
};

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
