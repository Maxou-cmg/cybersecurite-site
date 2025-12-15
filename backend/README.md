Newsletter backend (minimal)

This small Node.js app provides a POST /subscribe endpoint that accepts `email` and appends it to `subscribers.csv`.

Quick start (local):

```bash
cd backend
npm install
npm start
```

Then POST to `http://localhost:3000/subscribe` with JSON `{ "email": "you@example.com" }` or form-encoded data.

Deployment suggestions:
- Deploy to Railway / Heroku / Fly with Node support.
- Set `PORT` via environment if needed.
- Replace file storage with a proper DB or email provider (Mailgun, SendGrid) in production.
