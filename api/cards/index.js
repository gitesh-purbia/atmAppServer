const express = require('express');
const router = express.Router();
const cardsCtrl = require('./cards.controller');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the about route
router.post('/getCardInfo', cardsCtrl.getCardInfo);
// router.get('/getAllCards', cardsCtrl.getAllCards);
router.post('/withdrawAmount', cardsCtrl.withdrawAmount);
module.exports = router;
