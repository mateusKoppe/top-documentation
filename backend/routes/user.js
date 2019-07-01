const express = require('express');
const router = express.Router();

const User = require('../models/user')

router.post('/', (req, res, next) => {
  const user = new User(req.body.email);
  user.level = req.body.level || user.level
  user.encryptPassword(req.body.password)
  user.save()
  res.json({
    email: user.email,
    level: user.level
  })
})

router.post('/login', (req, res, next) => {
  const user = User.login(req.body.email, req.body.password)
  res.json(user)
})

module.exports = router;
