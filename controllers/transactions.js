const Transaction = require('../models/Transaction');
const Customer = require('../models/Customer');
const Book = require('../models/Book');

exports.find = (req, res) => {
  Transaction.find()
  .populate('member books')
  .exec((err, transactions) => {
    res.send(transactions);
  });
};

exports.create = (req, res) => {

  const isbns = req.body.isbns.split(',');

  Customer.findOne({ memberId: req.body.memberId })
  .exec((err, customer) => {
    Book.find({ isbn: { $in: isbns } })
    .exec((errFindBoos, books) => {
      const bookIds = books.map((book) => {
        return book._id;
      });

      const transactionOptions = {
        member: customer._id,
        days: req.body.days,
        outDate: new Date(req.body.outDate),
        dueDate: new Date(req.body.dueDate),
        inDate: new Date(req.body.inDate),
        fine: req.body.fine,
        books: bookIds,
      };
      const transaction = new Transaction(transactionOptions);
      transaction.save((err) => {
        if (!err) {
          res.send({ result: 'CREATE_OK' });
        } else {
          console.log(err);
          res.status(500).send('Error');
        }
      });
    });
  });
};

exports.update = (req, res) => {

  const transactionId = req.params.transactionId;
  const isbns = req.body.isbns.split(',');

  Customer.findOne({ memberId: req.body.memberId })
  .exec((err, customer) => {
    Book.find({ isbn: { $in: isbns } })
    .exec((errFindBooks, books) => {
      const bookIds = books.map((book) => {
        return book._id;
      });

      Transaction.findOne({ _id: transactionId })
      .exec((errFindTransaction, transaction) => {
        transaction.member = customer._id;
        transaction.days = req.body.days;
        transaction.outDate = new Date(req.body.outDate);
        transaction.dueDate = new Date(req.body.dueDate);
        transaction.inDate = new Date(req.body.inDate);
        transaction.fine = req.body.fine;
        transaction.books = bookIds;

        transaction.save((errSave) => {
          if (!errSave) {
            res.send({ result: 'UPDATE_OK' });
          } else {
            console.log(errSave);
            res.status(500).send('Error');
          }
        });
      });
    });
  });
};

exports.delete = (req, res) => {
  const transactionId = req.params.transactionId;
  Transaction.findOne({ _id: transactionId }, (err, transaction) => {
    transaction.remove((saveErr) => {
      if (!saveErr) {
        res.send({ result: 'DELETE_OK' });
      } else {
        console.log(saveErr);
        res.status(500).send('Error');
      }
    });
  });
};
