const { validateContactForm } = require('../utils/validation');
const { sendContactEmail } = require('../utils/emailService');

async function handleContactForm(req, res) {
  try {
    const { name, email, message } = req.body;

    // Validate
    const { isValid, errors } = validateContactForm({ name, email, message });
    if (!isValid) {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: errors });
    }

    // Send email (optional)
    await sendContactEmail({ name, email, message });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res
      .status(500)
      .json({ error: 'Something went wrong. Please try again later.' });
  }
}

module.exports = { handleContactForm };
