'use strict';
const http = require('http');
const sendFile = require('./sendFile');
const debug = require('debug')('server');

const server = http.createServer((req, res) => {
    let reqUrl = '';

    try {
        reqUrl = decodeURIComponent(req.url);
    } catch (err) {
        res.statusCode = 400;
        res.end();
        debug('Проблема с декодированием URL');
    };

    if(~req.url.indexOf('/0')) {
        res.statusCode = 400;
        res.end();
        debug('Попытка пропихнуть /0');
    } else {
        sendFile(reqUrl, res);
    };
}).listen(3000, 'localhost');

debug('server start');