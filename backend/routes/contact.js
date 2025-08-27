const express = require('express');
const { validateContactForm, securityValidation } = require('../middleware/validation');
const { submitContactForm, testEmail } = require('../controllers/contactControllers');

const router = express.Router();


// POST /api/contact/submit
router.post('/submit', async (req, res) => {
  try {
    // validate only name, email, message
    const { error, value } = validateContactForm(req.body);

    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map(err => ({
          field: err.context.key,
          message: err.message
        }))
      });
    }

    // Pass the valid data to controller
    const result = await handleContactForm(value);

    res.status(200).json({
      message: 'Form submitted successfully!',
      data: result
    });
  } catch (err) {
    console.error('❌ Contact route error:', err);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;

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
    requiredFields: ['name', 'email', 'message'],
    limits: {
      name: '2-100 characters',
      email: '255 characters max',
      message: '20-2000 characters'
    }
  });
});

module.exports = router;
