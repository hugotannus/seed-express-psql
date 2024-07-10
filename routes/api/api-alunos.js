const e = require('express');
const db = require('../../config/config_database');
const router = require('express').Router();

let ALUNOS = require('../../tests/mocks/alunos.json');

// http://localhost:3000/api/v1/alunos
router.get('/', async function (_req, res, next) {
    const query = 'SELECT * FROM alunos';

    try {
        const data = await db.any(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.get('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula;
    const query = 'SELECT * FROM alunos WHERE matricula = $1';

    try {
        const data = await db.one(query, matricula);
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.post('/', async function(req, res, next) {
    const query = `INSERT
    INTO alunos (matricula, nome, email, data_nascimento)
    VALUES ($1, $2, $3, $4)`;

    let { matricula, nome, email, data_nascimento } = req.body;

    const values = [ matricula, nome, email, data_nascimento ];

    try {
        const data = await db.any(query, values);
        console.log(data);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
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