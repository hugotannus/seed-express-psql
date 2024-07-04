const express = require('express');
const router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

/* GET users listing. */
router.get('/', function (_req, res, next) {
    const data = { title: 'Alunos', alunos };
    res.render('list', data);
});

router.get('/new', function (_req, res, next) {
    const { heads: labels } = alunos;

    res.render('form', { title: 'Novo Aluno',  buttonText: 'Adicionar Aluno', labels });
});

router.post('/create', function(req, res, next){
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula)
    };

    res.redirect('/alunos');
});

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;
 
    const aluno = alunos.content[matricula];

    res.render('read_one', { aluno, title: 'Detalhes do Aluno'});
});

router.get('/edit/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    
    const aluno = alunos.content[matricula];

    res.render('form', { aluno, title: 'Editar Aluno', buttonText: 'Salvar Alterações' });
});

router.post('/', function (req, res, next) {
    const aluno = req.body;
    const { matricula } = aluno;

    alunos.content[matricula] = { ...aluno, matricula: Number(matricula) };

    res.redirect(303, '/alunos');
});

module.exports = router;