const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router
  .get('/', async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.send(expenses)
    } catch (err) {
      console.log(err)
      res.send(err)
    }
    
  })
  .post('/', async (req, res) => {
    try {
      const newExpense = new Expense({
        amount: req.body.amount,
        category: req.body.category,
        date: {
          year: req.body.date.year,
          month: req.body.date.month,
          day: req.body.date.day
        }
      })
      await newExpense.save();
      res.send(newExpense);
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })
  .get('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        res.send(expense)
      } catch (err) {
        console.log(err)
        res.send(err)
      }
  })
  .put('/:id', async (req, res) => {
      try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, {
            goal: req.body.goal,
            date: {
              year: req.body.date.year,
              month: req.body.date.month,
              day: req.body.date.day
            }
        })
        res.send(updatedExpense);
      } catch (err) {
        console.log(err);
        res.send(err);
      }
  })
  .delete('/:id', async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.id)
      res.redirect('/api/expenses');
    } catch(err) {
      console.log(err);
      res.send(err);
    }
  })

module.exports = router;