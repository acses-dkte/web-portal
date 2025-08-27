const express = require('express');
const { validateContactForm, securityValidation } = require('../middleware/validation');
const { submitContactForm, testEmail } = require('../controllers/contactControllers');

const router = express.Router();

const { handleContactForm } = require('../controllers/contactControllers');

// POST /api/contact/submit
router.post('/submit', handleContactForm);

// Test endpoint (development only)
router.post('/test', testEmail);

// Get contact form info
router.get('/info', (req, res) => {
  res.json({
    message: 'ACSES Contact Form API',
    version: '1.0.0',
    endpoints: {
      submit: 'POST /api/contact/submit',
      test: 'POST /api/contact/test (development only)'
    },
    requiredFields: ['name', 'email', 'subject', 'message'],
    optionalFields: ['phone'],
    limits: {
      name: '2-100 characters',
      email: '255 characters max',
      phone: '10-20 digits',
      subject: '5-200 characters',
      message: '20-2000 characters'
    }
  });
});

module.exports = router;
