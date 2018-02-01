/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';

const Cards = require('../api/cards/cards.model');
console.log(Cards);
Cards.remove()
  .then(() => {
    Cards.create({
      cardNumber: 232345456767,
      pin: 2323,
      balance: 5000
    }, {
      cardNumber: 898978786767,
      pin: 8989,
      balance: 10000
    }, {
      cardNumber: 565678789090,
      pin: 2222,
      balance: 15000
    })
    .then(() => {
      console.log('finished populating cards');
    });
  });
