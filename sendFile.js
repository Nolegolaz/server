'use strict'
const fs = require('fs');

function sendFile (req, res) {
    let fileStream = fs.ReadStream(`public${req.url}`);

    fileStream.pipe(res);
};

module.exports = sendFile;

