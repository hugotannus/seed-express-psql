const { localApi } = require('../../config/config_axios');

const express = require('express');
const { fsync } = require('fs');
const router = express.Router();
const path = require('path');

router.get('/', async function (_req, res, next) {
    try {
        let resposta = await localApi.get('/api/v1/alunos');
        let alunos = resposta.data;
        let viewData = { title: 'Alunos', alunos };

        res.status(200).render('list', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/new', function (_req, res, next) {
    let viewData = {
        metodo: "POST",
        parametro: "create",
        title: 'Novo Aluno',
        buttonText: 'Adicionar Aluno'
    }

    res.render('form', viewData);
});

router.get('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula;

    try {
        let response = await localApi.get('/api/v1/alunos/' + matricula);

        let aluno = response.data;
        let viewData = { aluno, title: 'Detalhes do Aluno'}

        res.status(200).render('card', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/edit/:matricula', async function (req, res, next) {
    let matricula = req.params.matricula;
    let apiUrlPath = '/api/v1/alunos/' + matricula;
    
    let viewData = {
        metodo: "PUT",
        parametro: matricula,
        title: 'Editar Aluno',
        buttonText: 'Atualizar Aluno'
    }

    try {
        let resposta = await localApi.get(apiUrlPath);
        let aluno = resposta.data;
        viewData.aluno = aluno;

        res.status(200).render('form', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.post('/create', async function(req, res, next){
    let apiUrlPath = '/api/v1/alunos/';
    let data = req.body;

    try {
        await localApi.post(apiUrlPath, data);
    } catch (error) {
        console.error(error.message)
    } finally {
        res.redirect('/alunos');
    }
});

router.put('/:matricula', async function (req, res, next) {
    let matricula = req.params.matricula;
    let apiUrlPath = '/api/v1/alunos/' + matricula;
    
    const data = req.body;

    try {
        await localApi.put(apiUrlPath, data);
        res.redirect('/alunos/' + matricula);
    } catch (error) {
        console.error(error.message)
        res.redirect('/alunos/' + matricula);
    }
});

router.delete('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula;

    try {
        await localApi.delete('/api/v1/alunos/' + matricula);
    } catch (error) {
        res.json({msg: error.message})
    } finally {
        res.redirect(303, '/alunos');
    }
});

module.exports = router;