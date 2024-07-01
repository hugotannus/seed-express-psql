var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('read', { title: 'Alunos' });
});

router.get('/new', function (req, res, next) {
    res.render('form', { title: 'Novo Aluno' });
});

router.get('/edit/:id', function (req, res, next) {
    res.render('form', { title: 'Editar Aluno' });
});

module.exports = router;