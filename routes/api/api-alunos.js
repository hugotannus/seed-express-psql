const express = require('express');
const router = express.Router();
let alunos = require('../../tests/mocks/alunos.json');

// http://localhost:3000/api/v1/alunos
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
        res.status(200).json(aluno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.post('/', function(req, res, next) {
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;

    alunos.content[matricula] = { ...novoAluno };

    const response = {
        msg: "Aluno criado com sucesso!",
        aluno: alunos.content[matricula]
    }

    res.status(201).json(response);
});

router.put('/:matricula', function (req, res, next) {
    const novoAluno = req.body;
    const matricula = Number(req.params.matricula);

    alunos.content[matricula] = { ...novoAluno, matricula };

    const response = {
        msg: "Aluno atualizado com sucesso!",
        aluno: alunos.content[matricula]
    }

    res.status(200).json(response);
});

router.delete('/:matricula', function (req, res, next) {
    const matricula = req.params.matricula;

    delete alunos.content[matricula];

    const response = {
        msg: "Aluno removido!",
        matricula
    }

    res.status(200).json(response);
});

module.exports = router;