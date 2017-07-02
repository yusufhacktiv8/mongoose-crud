const Customer = require('../models/Customer');

exports.find = (req, res) => {
  Customer.find((err, customers) => {
    res.send(customers);
  });
};

exports.create = (req, res) => {
  const customerOptions = req.body;
  const customer = new Customer(customerOptions);
  customer.save((err) => {
    if (!err) {
      res.send({ result: 'CREATE_OK' });
    } else {
      console.log(err);
      res.status(500).send('Error');
    }
  });
};

exports.update = (req, res) => {
  const memberId = req.params.memberId;
  const customerOptions = req.body;
  Customer.find({ memberId }, (err, customers) => {
    const customer = customers[0];
    customer.memberId = customerOptions.memberId;
    customer.name = customerOptions.name;
    customer.zipCode = customerOptions.zipCode;
    customer.phone = customerOptions.phone;
    customer.address = customerOptions.address;

    customer.save((saveErr) => {
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
  const memberId = req.params.memberId;
  Customer.find({ memberId }, (err, customers) => {
    const customer = customers[0];
    customer.remove((saveErr) => {
      if (!saveErr) {
        res.send({ result: 'DELETE_OK' });
      } else {
        console.log(saveErr);
        res.status(500).send('Error');
      }
    });
  });
};
