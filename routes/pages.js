var express = require('express');
var router = express.Router();

const Pages = require('../models/pages')

router.get('/:page', function(req, res, next) {
  const pages = Pages.getPageList();
  const content = Pages.getPageContent(req.params.page)
  res.render('pages/index', {
    content,
    pages,
    title: req.params.page
  });
});

module.exports = router;
