const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  memberId: String,
  name: String,
  zipCode: String,
  phone: String,
  address: String,
}, { timestamps: true });

const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;
