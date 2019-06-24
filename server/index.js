const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  let users = [
    { id: 1, firstName: 'Eileen', lastName: 'Galindo' },
    { id: 2, firstName: 'John', lastName: 'Doe' },
    { id: 3, firstName: 'Jane', lastName: 'Doe' }
  ];
  res.json(users);
});
const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
