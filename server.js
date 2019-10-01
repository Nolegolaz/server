'use strict';
const http = require('http');
const sendFile = require('./sendFile');

const server = http.createServer((req, res) => {
    let reqUrl = '';
    try {
        reqUrl = decodeURIComponent(req.url);
    } catch (err) {
        res.statusCode = 400;
        res.end();
    };

    if(~req.url.indexOf('/0')) {
        res.statusCode = 400;
        res.end();
    } else {
        sendFile(reqUrl, res);
    };
}).listen(3000, 'localhost');