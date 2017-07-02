const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/library2';

const booksRoute = require('./routes/books');
const customersRoute = require('./routes/customers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/books', booksRoute);
app.use('/api/customers', customersRoute);

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(3000);
});
