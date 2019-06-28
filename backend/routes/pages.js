var express = require('express');
var router = express.Router();

const Pages = require('../models/pages')

router.get('/', (req, res, next) => {
  const pages = Pages.getPageList();
  res.json(pages);
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

router.get('/:slug', function(req, res, next) {
  const page = Pages.getPageList(req.params.folder)[req.params.slug];
  const content = Pages.getPageContent(req.params.slug);
  res.json({
    ...page,
    ...content
  });
});

router.get('/folder/:folder', function(req, res, next) {
  const pages = Pages.getPageList(req.params.folder);
  res.json(pages);
});

module.exports = router;
