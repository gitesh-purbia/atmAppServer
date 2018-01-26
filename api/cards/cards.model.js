const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cards = new Schema({

  cardNumber: {
    type: Number,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Cards', cards);
