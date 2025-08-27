const Joi = require('joi');

// utils/validation.js

function validateContactForm({ name, email, message }) {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long.' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email address.' });
  }

  if (!message || message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long.' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = { validateContactForm };
