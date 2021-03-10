const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const totalMoneyRoutes = require('./routes/totalMoneyRoutes');
const goalRoutes = require('./routes/goalRoutes');
const expensesRoutes = require('./routes/expensesRoutes')

const app = express();

mongoose.connect('mongodb://localhost/money-saver', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET, POST', 'PUT')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    next();
})

app.use('/api/totalMoney', totalMoneyRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/expenses', expensesRoutes);

const port = 5000;
app.listen(port, () => {
    `Listening on port ${port}`
});