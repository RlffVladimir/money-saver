const express = require('express');
const router = express.Router();
const TotalMoney = require('../models/TotalMoney');
const auth = require('../middleware/auth');

router
  .get('/', async (req, res) => {
    try {
      console.log(req.headers);
      const totalMoney = await TotalMoney.find();
      res.send(totalMoney)
    } catch (err) {
      console.log(err)
      res.send(err)
    }
    
  })
  .post('/', async (req, res) => {
    try {
      const existingTotalMoney = await TotalMoney.deleteMany({
        user: req.body.user,
      })
      const totalMoney = new TotalMoney({
        amount: req.body.amount,
        user: req.body.user
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
      await TotalMoney.find({user: req.body.user}).deleteMany();
      res.redirect('/api/totalMoney');
    } catch(err) {
      console.log(err);
      res.send(err);
    }
  })

module.exports = router;