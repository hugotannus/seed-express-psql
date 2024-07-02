var express = require('express');
var router = express.Router();
var alunos = require('../tests/mocks/alunos.json')

/* GET users listing. */
router.get('/', function (_req, res, next) {
    res.render('read', { title: 'Alunos', alunos });
});

router.get('/new', function (_req, res, next) {
    res.render('form', { title: 'Novo Aluno',  buttonText: 'Adicionar' });
});

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    
    const aluno = alunos.content[matricula];

    res.render('read_one', { title: 'Detalhes do Aluno', buttonText: 'Salvar', labels: alunos.heads, ...aluno });
});

router.get('/edit/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    
    const aluno = alunos.content[matricula];

    res.render('form', { title: 'Editar Aluno', buttonText: 'Salvar', labels: alunos.heads, aluno });
});

module.exports = router;