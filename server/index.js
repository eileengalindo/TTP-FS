const express = require('express');
const app = express();

app.use('/api', require('./api'));

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
