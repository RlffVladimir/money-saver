const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/money-saver', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
    res.send('hello')
})

const port = 3000;
app.listen(port, () => {
    `Listening on port ${3000}`
});