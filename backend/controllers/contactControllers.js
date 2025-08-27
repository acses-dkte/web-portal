const emailService = require('../utils/emailService');

const submitContactForm = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    console.log('📧 Processing contact form submission from:', contactData.email);

    // Send notification email to admin
    const emailResult = await emailService.sendContactFormEmail(contactData);

    // Send auto-reply to user (non-blocking)
    emailService.sendAutoReply(contactData).catch(error => {
      console.warn('⚠️ Auto-reply failed (non-critical):', error.message);
    });

    // Log successful submission
    console.log('✅ Contact form processed successfully:', {
      name: contactData.name,
      email: contactData.email,
      subject: "",
      messageId: emailResult.messageId
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
      data: {
        submittedAt: contactData.timestamp,
        messageId: emailResult.messageId
      }
    });

  } catch (error) {
    console.error('❌ Contact form submission failed:', error);

    res.status(500).json({
      error: 'Submission Failed',
      message: 'We encountered an issue processing your message. Please try again later or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

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
