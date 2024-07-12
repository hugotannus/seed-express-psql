const pgp = require('pg-promise')(/* options */)

const BASE = 'inclusimap';
const HOST = 'localhost';
const USER = 'postgres';
const PSWD = 'postgres';
const PORT = 5432;

const db = pgp(`postgres://${USER}:${PSWD}@${HOST}:${PORT}/${BASE}`);

module.exports = db;