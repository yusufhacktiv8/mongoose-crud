const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  days: Number,
  outDate: Date,
  dueDate: Date,
  inDate: Date,
  fine: Number,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
}, { timestamps: true });

const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;
