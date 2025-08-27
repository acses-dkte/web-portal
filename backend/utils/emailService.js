const nodemailer = require('nodemailer');

/**
 * Build a robust HTML email with inline CSS (Outlook/Gmail friendly)
 */
function buildEmailHtml({ name, email, message }) {
  const safe = (s = '') => String(s).replace(/[<>&"]/g, c => (
    { '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;' }[c]
  ));

  const preheader = `New message from ${safe(name)} via your website`; // shows in inbox previews

  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Contact Message</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Preheader hidden text -->
  <style>
    .preheader { display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0; }
    @media (prefers-color-scheme: dark) {
      .card { background: #101214 !important; color: #E6E6E6 !important; }
      .meta { color: #B5BDC5 !important; }
      .footer { color: #B5BDC5 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f3f5f7;">
  <span class="preheader">${preheader}</span>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f5f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px;width:100%;">
          <!-- Header -->
          <tr>
            <td align="left" style="padding:16px 8px;">
              <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#7a869a;">
                ACSES Website • Contact Form
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:14px;padding:0;border:1px solid #e6e8eb;box-shadow:0 1px 2px rgba(16,24,40,.04);">
              <!-- Header band -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#6366f1,#22c55e);height:6px;border-radius:14px 14px 0 0;"></td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 28px 8px 28px;">
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:20px;font-weight:700;color:#0b1324;">
                      New contact message
                    </div>
                    <div class="meta" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:13px;color:#738096;margin-top:6px;">
                      Received on ${new Date().toLocaleString()}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 28px 20px 28px;">
                    <!-- Info box -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef1f4;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 18px;background:#fafbfc;border-bottom:1px solid #eef1f4;">
                          <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#7a869a;text-transform:uppercase;letter-spacing:.04em;">
                            Sender details
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:16px 18px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#0b1324;padding:4px 0;width:120px;">Name</td>
                              <td style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155;padding:4px 0;">${safe(name)}</td>
                            </tr>
                            <tr>
                              <td style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#0b1324;padding:4px 0;width:120px;">Email</td>
                              <td style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155;padding:4px 0;">
                                <a href="mailto:${safe(email)}" style="color:#2563eb;text-decoration:none;">${safe(email)}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <div style="height:14px;"></div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="card" style="border:1px solid #eef1f4;border-radius:10px;background:#ffffff;">
                      <tr>
                        <td style="padding:14px 18px;background:#fafbfc;border-bottom:1px solid #eef1f4;">
                          <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#7a869a;text-transform:uppercase;letter-spacing:.04em;">
                            Message
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:18px;">
                          <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0b1324;white-space:pre-wrap;">
                            ${safe(message)}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <div style="text-align:center;margin:22px 0 6px;">
                      <a href="mailto:${safe(email)}"
                         style="display:inline-block;background:#0ea5e9;border-radius:10px;padding:10px 16px;
                                color:#ffffff;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;
                                font-weight:600;text-decoration:none;">
                        Reply to ${safe(name)}
                      </a>
                    </div>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="footer" style="padding:14px 8px;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#7a869a;">
              You’re receiving this email because someone submitted the contact form on your website.
            </td>
          </tr>
        </table>
        <!-- /Container -->
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function buildTextFallback({ name, email, message }) {
  return [
    `New contact message`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Message:`,
    message,
  ].join('\n\n');
}

/**
 * Sends the styled email using Nodemailer
 */
async function sendContactEmail({ name, email, message }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
    throw new Error('Email env vars missing. Set EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or configure host/port/secure for your SMTP
    auth: {
      user: process.env.EMAIL_USER,      // sender (SMTP user)
      pass: process.env.EMAIL_PASS,      // app password (for Gmail)
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,              // who filled the form
    replyTo: `${name} <${email}>`,             // so Reply goes to the sender
    to: process.env.ADMIN_EMAIL,            // your inbox
    subject: `New contact message from ${name}`,
    html: buildEmailHtml({ name, email, message }),
    text: buildTextFallback({ name, email, message }),
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

module.exports = { sendContactEmail };
