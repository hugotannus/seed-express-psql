const { localApi }= require('../config/config_axios');
const express = require('express');
const router = express.Router();

let alunos = require('../tests/mocks/alunos.json');

router.get('/', async function (_req, res, next) {
    try {
        const { data: alunos } = await localApi.get('/alunos');
        const data = { title: 'Alunos', alunos };

        res.status(200).render('list', data);
    } catch (error) {
        res.json({msg: error.message})
    }
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

router.get('/:matricula', async function (req, res, next) {
    const { matricula } = req.params;

    try {
        const { data: aluno } = await localApi.get('/alunos/' + matricula);
        res.status(200).render('card', { aluno, title: 'Detalhes do Aluno'});
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/edit/:matricula', async function (req, res, next) {
    const { matricula } = req.params;
    
    try {
        const { data: aluno } = await localApi.get('/alunos/' + matricula);
        const data = {
            aluno,
            metodo: "PUT",
            parametro: matricula,
            title: 'Editar Aluno',
            buttonText: 'Salvar Alterações'
        }

        res.status(200).render('form', data);
    } catch (error) {
        res.json({msg: error.message})
    }
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

router.put('/:matricula', function (req, res, next) {
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