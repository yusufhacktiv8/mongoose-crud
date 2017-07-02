const Transaction = require('../models/Transaction');

exports.find = (req, res) => {

  Transaction.find()
  .populate('customer books')
  .exec((err, transactions) => {
    res.send(transactions);
  });
};
