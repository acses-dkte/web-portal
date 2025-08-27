const emailService = require('../utils/emailService');

async function handleContactForm(req, res) {
  try {
    const { name, email, message } = req.body;

    // Validate
    const { isValid, errors } = validateContactForm({ name, email, message });
    if (!isValid) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // Send email (optional)
    await sendContactEmail({ name, email, message });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}

module.exports = { handleContactForm };

// Test endpoint for checking email service
const testEmail = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Endpoint not found' });
  }

  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from the ACSES contact form API.',
      timestamp: new Date().toISOString()
    };

    await emailService.sendContactFormEmail(testData);
    
    res.json({
      success: true,
      message: 'Test email sent successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Test failed',
      message: error.message
    });
  }
};

module.exports = {
  submitContactForm,
  testEmail
};
