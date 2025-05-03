// backend/src/app.js
const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(3001, () => console.log('Backend on port 3001'));