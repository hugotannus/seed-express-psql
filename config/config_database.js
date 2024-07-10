const pgp = require('pg-promise')(/* options */)

const BASE = 'exemplo_db';
const HOST = 'localhost';
const USER = 'postgres';
const PSWD = 'postgres';
const PORT = 5432;

const db = pgp(`postgres://${USER}:${PSWD}@${HOST}:${PORT}/${BASE}`);

// const { DB_BASE, DB_HOST, DB_USER, DB_PSWD, DB_PORT } = process.env;
// const connectUrl = `postgres://${process.env.DB_USER}:${DB_PSWD}@${DB_HOST}:${DB_PORT}/${DB_BASE}`;

// console.log(connectUrl);

// const db = pgp(connectUrl);

module.exports = db;