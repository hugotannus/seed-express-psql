var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/alunos', function(req, res, next) {
  res.render('page', { title: 'Alunos' });
});

module.exports = router;
