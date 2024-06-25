var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    title: 'Express',
    name: 'Hugo'
  }
  
  res.render('index', data);
});

module.exports = router;
