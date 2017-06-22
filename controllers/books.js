const Book = require('../models/Book');

exports.find = (req, res) => {
  Book.find((err, books) => {
    res.send(books);
  });
};

exports.create = (req, res) => {
  const bookOptions = req.body;
  const book = new Book(bookOptions);
  book.save((err) => {
    if (!err) {
      res.send({ result: 'CREATE_OK' });
    } else {
      console.log(err);
      res.status(500).send('Error');
    }
  });
};

exports.update = (req, res) => {
  const isbn = req.params.isbn;
  const bookOptions = req.body;
  Book.find({ isbn }, (err, books) => {
    const book = books[0];
    book.title = bookOptions.title;
    book.author = bookOptions.author;
    book.category = bookOptions.category;
    book.stock = bookOptions.stock;

    book.save((saveErr) => {
      if (!saveErr) {
        res.send({ result: 'UPDATE_OK' });
      } else {
        console.log(saveErr);
        res.status(500).send('Error');
      }
    });
  });
};

exports.delete = (req, res) => {
  const isbn = req.params.isbn;
  Book.find({ isbn }, (err, books) => {
    const book = books[0];
    book.remove((saveErr) => {
      if (!saveErr) {
        res.send({ result: 'DELETE_OK' });
      } else {
        console.log(saveErr);
        res.status(500).send('Error');
      }
    });
  });
};
