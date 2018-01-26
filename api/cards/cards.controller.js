'use strict';
const CardsModel = require('./cards.model');
const TransactionsModel = require('../transactions/transactions.model');

module.exports.getCardInfo = function (req, res, next) {
  CardsModel.findOne({
    cardNumber: req.body.cardNumber,
    pin: req.body.pin
  }).then(card => {
    if(!card) {
      res.status(409).send({message: 'Wrong card number or pin.!'});
    }
    return res.json(card);
  })
  .catch(err => next(err));
};

module.exports.withdrawAmount = (req, res, next) => {
  CardsModel.findOne({
    cardNumber: req.body.cardNumber,
    pin: req.body.pin
  }).then(card => {
    if(!card) {
      return res.status(404).end();
    } else if(card.balance < req.body.withdrawAmount) {
      res.status(409).send({message: 'You Do Not have sufficient balance in your account!'});
    } else {
      const deductedAmount = parseInt(card.balance, 10) - parseInt(req.body.withdrawAmount, 10);
      CardsModel.update({
        cardNumber: req.body.cardNumber
      }, {
        $set: {
          balance: deductedAmount
        }
      }, err => {
        if(err) {
          res.status(500).send(err);
        } else {
          const transactionObj = new TransactionsModel({
            cardNumber: req.body.cardNumber,
            amount: req.body.withdrawAmount,
            date: new Date(),
            transactionType: 'Debited'
          });
          transactionObj.save(err => {
            if(err) {
              res.status(500).send(err);
            }
            return res.json({oldAmount: card.balance, newAmount: parseInt(card.balance, 10) - parseInt(req.body.withdrawAmount, 10)});
          });
        }
      });
    }
  })
  .catch(err => next(err));
};

// module.exports.getAllCards = function (req, res) {
//   CardsModel.find({}, {
//     _id: true,
//     cardNumber: true,
//     balance: true
//   },
//   function(err, cardsInstance) {
//     if(err) {
//       res.status(500).send(err);
//     }
//     res.status(200).send(cardsInstance);
//   });
// };
