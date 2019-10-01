'use strict'
const fs = require('fs');
const debug = require('debug')('sendFile');
const mime = require('mime');

function sendFile (reqUrl, res) {
    let fileStream;

    if(reqUrl === '/') {
        fileStream = fs.ReadStream(`public/index.html`);
    } else {
        fileStream = fs.ReadStream(`public${reqUrl}`);
    };

    fileStream.on('error', (err) => {
        debug(`Ошибка чтения файла ${err}`);
        res.statusCode = 404;
        res.end();
    })

    res.setHeader('Content-Type', `${mime.getType(`public${reqUrl}`)};charset=utf-8`);

    fileStream.pipe(res);

    res.on('close', () => {
        fileStream.destroy();
        debug('Прерванное соединение');
    })
};

module.exports = sendFile;

