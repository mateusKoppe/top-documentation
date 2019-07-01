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
  res.status(201)
    .json({
      email: user.email,
      level: user.level
    })
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
    return res.status(404).end()
  }
  res.json(user)
})

module.exports = router;
