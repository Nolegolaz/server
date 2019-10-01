'use strict';
const http = require('http');
const sendFile = require('./sendFile');

const server = http.createServer((req, res) => {
    
    sendFile(req, res);
}).listen(3000, 'localhost');