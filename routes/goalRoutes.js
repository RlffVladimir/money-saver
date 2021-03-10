const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

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
      const goal = new Goal({
        goal: req.body.goal,
        date: {
          year: req.body.date.year,
          month: req.body.date.month
        }
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
            }
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