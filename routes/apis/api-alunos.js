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

router.get('/:fk_aluno/:fk_curso', async function (req, res, next) {
    // const matricula = req.params.matricula;
    const id_aluno = req.params.fk_aluno;
    const id_curso = req.params.fk_curso;
    
    const query = `
        SELECT *
        FROM alunos
        WHERE matricula = $1
    `;

    const args = [matricula]

    try {
        const data = await db.one(query, args);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.post('/', async function (req, res, next) {
    const nome = req.body.nome;
    const email = req.body.email;
    const matricula = req.body.matricula;
    const data_nascimento = req.body.data_nascimento;
    
    const query = `
        INSERT
        INTO alunos (matricula, nome, email, data_nascimento)
        VALUES ($1, $2, $3, $4)
    `;

    const values = [matricula, nome, email, data_nascimento];

    try {
        const data = await db.none(query, values);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.put('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula;

    const nome = req.body.nome;
    const email = req.body.email;
    const data_nascimento = req.body.data_nascimento;

    const query = `
        UPDATE alunos
        SET nome=$2, email=$3, data_nascimento=$4
        WHERE matricula=$1
    `;

    const values = [matricula, nome, email, data_nascimento];

    try {
        const data = await db.none(query, values);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula;
    
    const query = 'DELETE FROM alunos WHERE matricula = $1';

    try {
        const data = await db.none(query, matricula);
        const msg = "Aluno removido com sucesso!"
        
        res.status(200).json({msg, data});
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;