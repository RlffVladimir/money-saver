const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');
const {Schema} = mongoose;

const monthSchema = new Schema({
    name: String,
    year: String,
    data: Object
});

const Month = mongoose.model('months', monthSchema);

const app = express();

mongoose.connect('mongodb://localhost/money-saver', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    next();
})

app.get(`/api/months`, async (req, res) => {
    const months = await Month.find();
    res.send(months)
  });

app.post(`/api/months`, async (req, res) => {
    try {
        const month = new Month({
            name: req.body.name,
            year: req.body.year
        })
        await month.save()
    } catch (e) {
        console.log(e);
    }
})

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
//   });

const port = 5000;
app.listen(port, () => {
    `Listening on port ${port}`
});