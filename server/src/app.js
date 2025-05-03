// backend/src/app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/api', apiRoutes);

app.listen(3001, () => console.log('Backend on port 3001'));