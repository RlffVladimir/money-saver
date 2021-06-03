const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

router
  .get('/', async (req, res) => {
    try {
      const goal = await Goal.find();
      res.send(goal)
    } catch (err) {
      console.log(err)
      res.send(err)
    }
    
  })
  .post('/', async (req, res) => {
    try {
      const existingGoals = await Goal.deleteMany({
        user: req.body.user, 
        date: {
          year: req.body.date.year, 
          month: req.body.date.month
      }})
      console.log(existingGoals)
      const goal = new Goal({
        goal: req.body.goal,
        date: {
          year: req.body.date.year,
          month: req.body.date.month
        },
        user: req.body.user
      })
      await goal.save();
      res.send(goal);
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })
  .get('/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        res.send(goal)
      } catch (err) {
        console.log(err)
        res.send(err)
      }
  })
  .put('/:id', async (req, res) => {
      try {
        const goal = await Goal.findByIdAndUpdate(req.params.id, {
            goal: req.body.goal,
            date: {
              year: req.body.date.year,
              month: req.body.date.month
            },
            user: req.body.user
        })
        res.send(goal);
      } catch (err) {
        console.log(err);
        res.send(err);
      }
  })
  .delete('/:id', async (req, res) => {
    try {
      await Goal.findByIdAndDelete(req.params.id)
      res.redirect('/api/totalMoney');
    } catch(err) {
      console.log(err);
      res.send(err);
    }
  })

module.exports = router;