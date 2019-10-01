'use strict'
const fs = require('fs');

function sendFile (reqUrl, res) {
    let fileStream = fs.ReadStream(`public${reqUrl}`);

    fileStream.on('error', (err) => {
        res.statusCode = 404;
        res.end();
    })
    fileStream.pipe(res);

    res.on('close', () => {
        fileStream.destroy();
    })
};

module.exports = sendFile;

