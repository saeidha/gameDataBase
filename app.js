const express = require('express');
const app = express ();
app.use(express.json());
const port = process.env.PORT || 3000;
const db = require('./database');

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/users', (req, res) => {
  db.all('SELECT id, name FROM user', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
