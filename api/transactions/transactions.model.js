const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transactions = new Schema({

  cardNumber: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  transactionType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Transactions', Transactions);
