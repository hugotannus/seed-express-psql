const db = require('../../config/config_database');
const router = require('express').Router();

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

router.post('/', async function (req, res, next) {
    const query = `
    INSERT INTO alunos (matricula, nome, email, data_nascimento)
    VALUES ($1, $2, $3, $4)`;

    let { matricula, nome, email, data_nascimento } = req.body;

    const values = [matricula, nome, email, data_nascimento];

    try {
        const data = await db.none(query, values);
        console.log(data);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.put('/:matricula', async function (req, res, next) {
    const query = `
    UPDATE alunos
    SET nome=$2, email=$3, data_nascimento=$4
    WHERE matricula=$1`;

    let { matricula, nome, email, data_nascimento } = req.body;

    const values = [matricula, nome, email, data_nascimento];

    try {
        const data = await db.none(query, values);
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.delete('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula;
    const query = 'DELETE FROM alunos WHERE matricula = $1';

    try {
        const data = await db.none(query, matricula);
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;