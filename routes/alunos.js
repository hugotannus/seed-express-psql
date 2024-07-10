const { localApi } = require('../config/config_axios');
const express = require('express');
const router = express.Router();
const path = require('path');

const API_PATH = '/api/v1';

const ALUNOS = require('../tests/mocks/alunos.json');

router.get('/', async function (_req, res, next) {
    try {
        let response = await localApi.get('/api/v1/alunos');
        let alunos = response.data;
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
    
    let apiUrlPath = path.join('alunos', matricula);

    try {
        let response = await localApi.get(apiUrlPath);
        let aluno = response.data;
        let viewData = { aluno, title: 'Detalhes do Aluno'}

        res.status(200).render('card', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/edit/:matricula', async function (req, res, next) {
    let matricula = req.params.matricula;
    let apiUrlPath = path.join('alunos', matricula);
    
    let viewData = {
        metodo: "PUT",
        parametro: matricula,
        title: 'Editar Aluno',
        buttonText: 'Salvar Alterações'
    }
    
    try {
        let response = await localApi.get(apiUrlPath);
        let aluno = response.data;
        
        viewData.aluno = aluno;
        
        res.status(200).render('form', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.post('/create', async function(req, res, next){
    let novoAluno = req.body;

    try {
        const response = await localApi.post("alunos", novoAluno);
        if(response.status == 201) res.redirect('/alunos');
    } catch (error) {
        console.error(error.message)
    }
});

router.put('/:matricula', async function (req, res, next) {
    // const { body, method } = req;
    let matricula = req.params.matricula;
    let apiUrlPath = path.join('alunos', matricula);
    
    const data = req.body;

    try {
        const response = await localApi.put(apiUrlPath, data);
        if(response.status == 201) res.redirect('/alunos');
    } catch (error) {
        console.error(error.message)
    }
});

router.delete('/:matricula', function (req, res, next) {
    const { matricula } = req.params;

    delete alunos.content[matricula];

    res.redirect('/alunos');
});

module.exports = router;