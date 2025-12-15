const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'subscribers.csv');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple health
app.get('/', (req, res) => res.send('Newsletter backend is running'));

// Subscribe endpoint
app.post('/subscribe', (req, res) => {
  const email = (req.body.email || req.query.email || '').toString().trim();
  if (!email || !email.includes('@')) {
    return res.status(400).json({ ok: false, message: 'Email invalide' });
  }

  const line = `${new Date().toISOString()},${email}\n`;
  fs.appendFile(DATA_FILE, line, (err) => {
    if (err) {
      console.error('Failed to save subscriber', err);
      return res.status(500).json({ ok: false, message: 'Erreur serveur' });
    }
    return res.json({ ok: true, message: 'Inscription enregistrée' });
  });
});

app.listen(PORT, () => {
  console.log(`Newsletter backend listening on port ${PORT}`);
});
