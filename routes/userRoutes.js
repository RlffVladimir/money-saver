const express = require('express');
const router = express.Router();
const {User, Name} = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');
const Goal = require('../models/Goal');
const TotalMoney = require('../models/TotalMoney');

router
  .get('/', auth, async (req, res) => {
    console.log('Req user id is ' + req.user.id)
    const user = await User.findById(req.user.id).populate('names').select('-password')
    res.json(user)
  })

  .get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
  })

  .get('/names', async (req, res) => {
    const names = await Name.find().populate('expenses')
    res.json(names);
  })

  .post('/register', async (req, res) => {
    const { username, password, names } = req.body;
    if (!username || !password || !names) {
      return res.status(400).json({ msg: 'Please enter all fields' })
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ msg: 'User already exists' })
    const hash = await bcrypt.hash(password, 12);

    const user = await new User({
      username,
      password: hash,
    })

    const name1 = await new Name({
      name: names[0].name,
      balance: names[0].balance,
      user
    }).save()

    const name2 = await new Name({
      name: names[1].name,
      balance: names[1].balance,
      user
    }).save()

    user.names.push(name1);
    user.names.push(name2);
    await user.save()

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.json({
      user: {
        id: user.id,
        username: user.username,
        names
      },
      token
    })
  })

  .post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' })
    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400000 });
        res.json({
          user: {
            id: user.id,
            username: user.username,
          },
          token
        });
      } else {
        res.status(400).json({ msg: 'Invalid credentials' });
      }
    } catch (err) {
      res.status(400).json({ msg: err });
    } 
  })

  //MODIFY USER'S NAME
  .put('/', async (req, res) => {
    try {
      const {name1, name2, oldname1, oldname2} = req.body;
    const foundName1 = await Name.findOneAndUpdate({name: oldname1}, {name: name1})
    const foundName2 = await Name.findOneAndUpdate({name: oldname2}, {name: name2})
    name1.save();
    name2.save();
    } catch (e) {
      res.json({msg: e})
    }
  })

  //MODIFY USER'S BALANCE
  .put('/balance', async (req, res) => {
    try {
      console.log('inside put')
      const {username, newBalance} = req.body;
      const foundUser = await User.findOne({username: username}).populate('names')
      const name = foundUser.names[0].name;
      const foundName = await Name.findOne({name});
      const otherName = foundUser.names[1].name;
      console.log(otherName);
      const foundOtherName = await Name.findOne({name: otherName});
      foundName.balance = newBalance;
      foundOtherName.balance = -newBalance;
      await foundName.save();
      await foundOtherName.save();
      res.json({msg: 'success'})
    } catch (e) {
      res.json({msg: e})
    }
  })

module.exports = router;