const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const {User, Name} = require('../models/User');

router

//GET ALL EXPENSES
  .get('/', async (req, res) => {
    try {
      // Expense.find().populate('purchaser').then(e => res.json(e))
      Expense.find().populate('user', 'username').populate('purchaser', 'name').then(e => res.json(e))
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })

//POST AN EXPENSE
  .post('/', async (req, res) => {
    try {
      console.log('HIT EXPENSE POST ROUTE')

      const {amount, productName, date, user, purchaser} = req.body;

      const foundUser = await User.findOne({username: user}).populate('names');
      const foundName = await Name.findOne({name: purchaser})
      const otherName = foundUser.names.filter(n => n.name !== purchaser)[0].name;
      const foundOtherName = await Name.findOne({name: otherName});

      const newExpense = new Expense({
        amount,
        productName,
        date: {
          year: date.year,
          month: date.month,
          day: date.day
        },
        user: foundUser,
        purchaser: foundName
      })

      foundName.expenses.push(newExpense)
      foundName.balance += (amount/2);
      foundOtherName.balance -= (amount/2);
      
      await foundName.save()
      await foundOtherName.save();
      await newExpense.save();
      res.status(200).json({msg: 'success'})
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })

  //CHANGE EXPENSE NAMES
  .put('/', async (req, res) => {
    try {
      const {username, newName} = req.body;
      const expenses = await Expense.find({username})
      const updatedExpenses = await expenses.updateMany({
        purchaser: newName
      })
      res.json({updatedExpenses})
    } catch (e) {
      res.json({msg: e})
    }
  })

  .delete('/', async (req, res) => {
    try {
      const {id} = req.body
      const expense = await Expense.findByIdAndDelete(id)
      res.status(200).json({expense})
    } catch (e) {
      res.json({msg: e})
    }
  })

module.exports = router;