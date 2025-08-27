const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  async init() {
    try {
      // Create transporter based on configuration
    if (process.env.EMAIL_SERVICE === 'gmail') {
  this.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use App Password
    }
  });
} else {
  this.transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}


      // Verify connection
      await this.transporter.verify();
      console.log('✅ Email service initialized successfully');
    } catch (error) {
      console.error('❌ Email service initialization failed:', error.message);
    }
  }

  async sendContactFormEmail(contactData) {
    const { name, email, message, timestamp } = contactData;

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - ACSES</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 0; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #b13bff, #5e17eb); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0; opacity: 0.9; }
        .content { padding: 30px; }
        .info-card { background: #f8f9fa; border-left: 4px solid #ffd34e; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .info-row { display: flex; margin-bottom: 15px; }
        .info-label { font-weight: bold; min-width: 100px; color: #555; }
        .info-value { flex: 1; color: #333; }
        .message-box { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; white-space: pre-wrap; }
        .footer { background: #333; color: white; text-align: center; padding: 20px; font-size: 14px; }
        .timestamp { color: #666; font-size: 12px; }
        .urgent { background: #fff3cd; border-color: #ffc107; }
        .contact-badge { display: inline-block; background: #007bff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p>ACSES Website - Association of Computer Science & Engineering Students</p>
        </div>
        
        <div class="content">
          <div class="info-card">
            <h3 style="margin-top: 0; color: #b13bff;">📋 Contact Details</h3>
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value"><strong>${name}</strong></span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></span>
            </div>
           
            <div class="info-row">
              <span class="info-label">Submitted:</span>
              <span class="info-value timestamp">${new Date(timestamp).toLocaleString()}</span>
            </div>
          </div>

          <h3 style="color: #b13bff;">💬 Message</h3>
          <div class="message-box">${message}</div>

          <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #2e7d32;"><strong>📨 Quick Actions:</strong></p>
            <p style="margin: 5px 0 0;">
              <a href="mailto:${email}?subject=Re: ${subject}" style="background: #4caf50; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; margin-right: 10px;">Reply via Email</a>
              <a href="tel:${phone || ''}" style="background: #2196f3; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block;">Call ${phone ? phone : 'N/A'}</a>
            </p>
          </div>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ACSES - Association of Computer Science & Engineering Students</p>
          <p style="font-size: 12px; opacity: 0.8;">This email was automatically generated from your website contact form.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const textContent = `
New Contact Form Submission - ACSES

Contact Details:
Name: ${name}
Email: ${email}
Submitted: ${new Date(timestamp).toLocaleString()}

Message:
${message}

---
This email was automatically generated from your website contact form.
ACSES - Association of Computer Science & Engineering Students
    `;

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      cc: process.env.CC_EMAILS ? process.env.CC_EMAILS.split(',') : [],
      subject: `🔔 New Contact: ${subject}`,
      text: textContent,
      html: htmlTemplate,
      replyTo: email,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'X-Contact-Form': 'ACSES-Website'
      }
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        message: 'Email sent successfully'
      };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendAutoReply(contactData) {
    const { name, email, subject } = contactData;

    const autoReplyHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #b13bff, #5e17eb); color: white; padding: 20px; border-radius: 8px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; border-radius: 8px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Thank You for Contacting ACSES! 🎉</h2>
        </div>
        <div class="content">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to the <strong>Association of Computer Science & Engineering Students</strong>!</p>
          <p>We have received your message "<strong></strong>" and will get back to you within 24-48 hours.</p>
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>🌐 Explore our website for upcoming events</li>
            <li>📱 Follow us on social media for the latest updates</li>
            <li>🤝 Join our community programs and workshops</li>
          </ul>
          <p>We appreciate your interest in ACSES and look forward to connecting with you!</p>
          <p>Best regards,<br><strong>ACSES Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ACSES - Empowering Future Tech Leaders</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const autoReplyOptions = {
      from: `"ACSES Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Thank you for contacting ACSES - We'll be in touch!`,
      html: autoReplyHtml
    };

    try {
      await this.transporter.sendMail(autoReplyOptions);
      console.log('✅ Auto-reply sent to:', email);
    } catch (error) {
      console.error('❌ Auto-reply failed:', error.message);
      // Don't throw error for auto-reply failure
    }
  }
}

module.exports = new EmailService();
