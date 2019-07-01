const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/user')

router.post('/', [
  check('email').isEmail(),
  check('password').isLength({min: 5})
],(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const user = new User(req.body.email);
  user.level = req.body.level || user.level
  user.encryptPassword(req.body.password)
  try {
    user.save()
  } catch (error) {
    return res.status(500).end()
  }
  res.status(201).json(user.data())
})

router.post('/login', [
  check('email').isEmail(),
  check('password').exists()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = User.login(req.body.email, req.body.password)
  if(!user) {
    return res.status(401).end()
  }
  res.status(202).json(user.data())
})

router.get('/byToken/:token', (req, res, next) => {
  const list = User.getList()
  let user;
  for (let key in list) {
    if (list[key].token == req.params.token) {
      user = list[key]
      break;
    }
  }
  if(!user) {
    return res.status(404).end()
  }
  res.status(202).json(user)
})

module.exports = router;
