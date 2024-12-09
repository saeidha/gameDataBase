const express = require('express');
const bodyParser = require('body-parser');
const { db, insertUser } = require('./database');
const app = express ();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
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


app.post('/api/add_new_user', (req, res) => {
    const name = req.body.name;
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
  
    insertUser(name, (err, id) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'User added successfully',
        user: { id, name }
      });
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
