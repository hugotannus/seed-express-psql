
const axios = require('axios');

const http = axios.create();
// const http = axios.create({ baseUrl: 'http://localhost:3000/api/v1/' });

module.exports = http;

