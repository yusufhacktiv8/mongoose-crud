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
