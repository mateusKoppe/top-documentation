var express = require('express');
var router = express.Router();

const Pages = require('../models/pages')

router.get('/:page', function(req, res, next) {
  const path = Pages.formatPath(req.params.page)
  const openPath = Pages.formatPath(req.query.open)
  const pages = Pages.getPageActiveList(openPath);
  const content = Pages.getPageContent(path);
  res.render('pages/index', {
    content,
    pages,
    title: req.params.page
  });
});

module.exports = router;
