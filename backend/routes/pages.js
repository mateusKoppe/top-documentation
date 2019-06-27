var express = require('express');
var router = express.Router();

const Pages = require('../models/pages')

router.get('/', (req, res, next) => {
  const pages = Pages.getPageList();
  res.json({ pages });
})

router.post('/', (req, res, next) => {
  try {
    Pages.createPage({
      title: req.body.title,
      description: req.body.description
    })
  } catch (error) {
    console.error(error);
  }
  res.json(req.body)
});

router.get('/:page', function(req, res, next) {
  const path = Pages.formatPath(req.params.page)
  const content = Pages.getPageContent(path);
  res.json({
    content,
    title: req.params.page
  });
});

module.exports = router;
