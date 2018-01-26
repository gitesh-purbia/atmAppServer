'use strict';
const TransactionsModel = require('../transactions/transactions.model');

module.exports.getTransactionsByCard = function (req, res, next) {
  console.log('==========================');
  TransactionsModel.find({
    cardNumber: req.params.cardNumber
  }).then(transactions => {
    return res.json(transactions);
  })
  .catch(err => next(err));
};
