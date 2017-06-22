const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  stock: Number,
}, { timestamps: true });

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
