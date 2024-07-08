const express = require('express');
const router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

/* GET users listing. */
router.get('/', function (_req, res, next) {
    const data = { title: 'Alunos', alunos };
    res.render('list', data);
});

router.get('/new', function (_req, res, next) {
    const data = {
        metodo: "POST",
        parametro: "create",
        title: 'Novo Aluno',
        buttonText: 'Adicionar Aluno'
    }

    res.render('form', data);
});

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;
 
    const aluno = alunos.content[matricula];

    res.render('card', { aluno, title: 'Detalhes do Aluno'});
});

router.get('/edit/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];
    const data = {
        aluno,
        metodo: "PUT",
        parametro: matricula,
        title: 'Editar Aluno',
        buttonText: 'Salvar Alterações'
    }

    res.render('form', data);
});

router.post('/', function (req, res, next) {
    const { body, method } = req;

    res.send({ body, method });
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

router.put('/:matricula/', function (req, res, next) {
    // const { body, method } = req;
    const { matricula } = req.params;
    const novoAluno = req.body;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula)
    };

    // res.send({ body, method, msg: 'Alteração de usuário' });
    res.redirect('/alunos');
});

router.delete('/:matricula', function (req, res, next) {
    const { matricula } = req.params;

    delete alunos.content[matricula];

    res.redirect('/alunos');
});

module.exports = router;