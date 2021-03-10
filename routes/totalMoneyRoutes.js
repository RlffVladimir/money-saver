const express = require('express');
const router = express.Router();
const TotalMoney = require('../models/TotalMoney');

router
  .get('/', async (req, res) => {
    try {
      const totalMoney = await TotalMoney.find();
      res.send(totalMoney)
    } catch (err) {
      console.log(err)
      res.send(err)
    }
    
  })
  .post('/', async (req, res) => {
    try {
      await TotalMoney.find().deleteMany();
      const totalMoney = new TotalMoney({
        amount: req.body.amount
      })
      await totalMoney.save();
      res.send(totalMoney);
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })
  .delete('/', async (req, res) => {
    try {
      await TotalMoney.find().deleteMany();
      res.redirect('/api/totalMoney');
    } catch(err) {
      console.log(err);
      res.send(err);
    }
  })

module.exports = router;