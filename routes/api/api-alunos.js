const express = require('express');
const router = express.Router();
let alunos = require('../../tests/mocks/alunos.json');

router.get('/', function (_req, res, next) {
    try {
        res.status(200).json(alunos);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;

    try{
        const aluno = alunos.content[matricula];
        res.status(200).json({ aluno });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.post('/', function(req, res, next){
    const novoAluno = req.body
    const { matricula, nome, data_nascimento, email } = novoAluno;
    
    if(!matricula || !nome || !data_nascimento || !email) {
        res.status(400).json({msg: 'Por favor, verifique se todos os campos foram preenchidos corretamente'});
        return;
    }

    try{
        alunos.content[matricula] = { ...novoAluno, matricula: Number(matricula) };
        res.status(201).json({ matricula });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.put('/:matricula', function (req, res, next) {
    const novoAluno = req.body
    const { matricula } = req.params;
    const { nome, data_nascimento, email } = novoAluno;
    
    if(!matricula || !nome || !data_nascimento || !email) {
        res.status(400).json({msg: 'Por favor, verifique se todos os campos foram preenchidos corretamente'});
        return;
    }

    try{
        alunos.content[matricula] = { ...novoAluno, matricula: Number(matricula) };
        res.status(201).json();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.delete('/:matricula', function (req, res, next) {
    const { matricula } = req.params;

    try {
        delete alunos.content[matricula];
        res.status(201).json();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;