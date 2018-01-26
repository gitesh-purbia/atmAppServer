const express = require('express');
const router = express.Router();
const transactionsCtrl = require('./transactions.controller');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the about route
router.get('/getTransactionsByCard/:cardNumber', transactionsCtrl.getTransactionsByCard);
module.exports = router;
