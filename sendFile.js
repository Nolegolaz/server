'use strict'
const fs = require('fs');
const debug = require('debug')('sendFile');

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
    fileStream.pipe(res);

    res.on('close', () => {
        fileStream.destroy();
        debug('Прерванное соединение');
    })
};

module.exports = sendFile;

