'use strict';
const http = require('http');
const sendFile = require('./sendFile');
const debug = require('debug')('server');
const config = require('./config');

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
}).listen(config.get('port'), config.get('host'));

debug('server start');