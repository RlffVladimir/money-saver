if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
const app = express();

// 'mongodb://localhost/money-saver'

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

app.use(express.json());
app.use((req, res, next) => {
    // res.set('Access-Control-Allow-Origin', 'https://moneysaver.orloffvladimir.com/api/');
    res.set('Access-Control-Allow-Origin', '*');

    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.set('Access-Control-Allow-Headers', 'Content-Type, x-auth-token')
    next();
})

//ROUTES
app.use('/api/totalMoney', require('./routes/totalMoneyRoutes'));
app.use('/api/goal', require('./routes/goalRoutes'));
app.use('/api/expenses', require('./routes/expensesRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
//ROUTES



const port = 5000;
app.listen(port, () => {
    `Listening on port ${port}`
});