const Joi = require('joi');

const contactFormSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s.'-]+$/)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'string.pattern.base': 'Name contains invalid characters'
    }),
    
  email: Joi.string()
    .trim()
    .email()
    .max(255)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
      'string.max': 'Email cannot exceed 255 characters'
    }),
    
  phone: Joi.string()
    .trim()
    .pattern(/^[\d\s\-\+\(\)]+$/)
    .min(10)
    .max(20)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Please provide a valid phone number',
      'string.min': 'Phone number must be at least 10 digits',
      'string.max': 'Phone number cannot exceed 20 characters'
    }),
    
  subject: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Subject is required',
      'string.min': 'Subject must be at least 5 characters long',
      'string.max': 'Subject cannot exceed 200 characters'
    }),
    
  message: Joi.string()
    .trim()
    .min(20)
    .max(2000)
    .required()
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 20 characters long',
      'string.max': 'Message cannot exceed 2000 characters'
    })
});

const validateContactForm = (req, res, next) => {
  const { error, value } = contactFormSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
      value: detail.context.value
    }));

    return res.status(400).json({
      error: 'Validation Failed',
      message: 'Please check your input and try again',
      details: validationErrors
    });
  }

  req.body = value; // Use validated and sanitized data
  next();
};

// Additional security checks
const securityValidation = (req, res, next) => {
  const { name, email, message, subject } = req.body;
  
  // Check for potential spam patterns
  const spamPatterns = [
    /https?:\/\/[^\s]+/gi, // URLs in name/subject
    /\b(buy now|click here|limited time|act now)\b/gi,
    /(.)\1{10,}/, // Repeated characters
    /@.*@/, // Multiple @ symbols
  ];

  const suspiciousContent = `${name} ${subject} ${message}`;
  const hasSpamPattern = spamPatterns.some(pattern => pattern.test(suspiciousContent));

  if (hasSpamPattern) {
    console.warn('🚨 Potential spam detected from:', email);
    return res.status(429).json({
      error: 'Submission Rejected',
      message: 'Your submission appears to be spam. Please contact us directly if this is a genuine inquiry.'
    });
  }

  next();
};

module.exports = {
  validateContactForm,
  securityValidation
};
