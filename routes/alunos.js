var express = require('express');
var router = express.Router();
var alunos = require('../tests/mocks/alunos.json')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('read', { title: 'Alunos', alunos });
});

router.get('/new', function (req, res, next) {
    res.render('form', { title: 'Novo Aluno',  buttonText: 'Adicionar' });
});

router.get('/edit/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    
    const keys = Object.keys(alunos.heads);
    const aluno = alunos.content.find(aluno => aluno.matricula == matricula);

    res.render('form', { keys, aluno, labels: alunos.heads, title: 'Editar Aluno', buttonText: 'Salvar' });
});

module.exports = router;