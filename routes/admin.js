const express = require('express');
const fs = require('fs');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('admin/form');
});

router.post('/', (req, res, next) => {
  try {
    fs.writeFileSync(`./resources/${req.body.title}.md`, req.body.description)
  } catch (error) {
    console.error(error);
  }
  res.redirect('/admin')
});

module.exports = router;
