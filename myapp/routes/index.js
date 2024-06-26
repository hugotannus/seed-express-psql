var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'Hugo' });
});

router.get('/about', function(req, res, next) {
  res.render('page', { title: 'Sobre o Projeto' });
});

module.exports = router;
