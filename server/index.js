const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
