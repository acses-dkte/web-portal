# ACSES — Association of Computer Science and Engineering Students

A modern web application for student engagement, featuring a responsive website, dynamic event and leadership management, and a secure contact API.

---

## 🚀 Features

- **Responsive Design**: Built with Tailwind CSS and Font Awesome, optimized for all devices.
- **Dynamic Content**: Leadership & Guilds, Events, Benefits handled via JavaScript data.
- **Animated UI**: Section reveals, interactive cards, typewriter effect, smooth transitions.
- **Contact Form**: Inline field-level validation, AJAX submission to backend, individual error/success messages.
- **Express API**: Rate-limited `/api/contact/submit` endpoint, Helmet security, CORS, centralized error handling, health check.

---

## 🛠 Tech Stack

| Area        | Stack                        |
|-------------|------------------------------|
| Frontend    | HTML, Tailwind CSS, JS   |
| Backend/API | Node.js, Express.js, Helmet, Morgan, Compression, RateLimit, CORS |
| Contact     | SMTP or other email providers|

---
---

## ✨ Customization

- **Leadership, Events & Benefits**: Edit arrays in the frontend JS file.
- **Branding & Media**: Update placeholder images and icons as needed.
- **Email**: Configure `/routes/contact.js` for your SMTP or service provider.

---

## 🛡 Security

- Helmet for secure HTTP headers.
- Rate limiting per IP.
- CORS configured for allowed origins.
- Input validation on both frontend and backend.

---

## 📄 License

MIT © ACSES & Contributors

---

> For questions and contributions, please open an issue or submit a pull request.

