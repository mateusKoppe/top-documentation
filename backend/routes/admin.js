const express = require('express');
const router = express.Router();

const Pages = require('../models/pages')

/* GET users listing. */
router.get('/', (req, res, next) => {
  const pages = Pages.getPageList();
  res.render('admin/form', { pages });
});

router.post('/', (req, res, next) => {
  try {
    Pages.createPage({
      title: req.body.title,
      description: req.body.description
    })
  } catch (error) {
    console.error(error);
  }
  res.redirect('/admin')
});

module.exports = router;
