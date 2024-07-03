const express = require('express');
const router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

/* GET users listing. */
router.get('/', function (_req, res, next) {
    const data = { title: 'Alunos', alunos };
    res.render('list', data);
});

router.get('/new', function (_req, res, next) {
    res.render('form', { title: 'Novo Aluno',  buttonText: 'Adicionar Aluno' });
});

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;
 
    const aluno = alunos.content[matricula];

    res.render('card', { aluno, title: 'Detalhes do Aluno'});
});

router.get('/edit/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    
    const aluno = alunos.content[matricula];

    res.render('form', { aluno, title: 'Editar Aluno', buttonText: 'Salvar Alterações' });
});

module.exports = router;