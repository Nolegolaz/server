'use strict'
const fs = require('fs');

function sendFile (reqUrl, res) {
    console.log(reqUrl);
    let fileStream;
    
    if(reqUrl === '/') {
        fileStream = fs.ReadStream(`public/index.html`);
    } else {
        fileStream = fs.ReadStream(`public${reqUrl}`);
    };

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

