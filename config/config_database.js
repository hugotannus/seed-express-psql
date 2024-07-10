const USER = 'hugotannus';
const PSWD = 'postgres';
const HOST = 'localhost';
const PORT = 5432;
const BASE = 'exemplo_db';

const pgp = require('pg-promise')(/* options */)
const db = pgp(`postgres://${USER}:${PSWD}@${HOST}:${PORT}/${BASE}`);

module.exports = db;