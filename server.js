'use strict';

const http = require('http');
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const fs = require('fs-extra');
const port = 8000;

const server = http.createServer((req, res) => {
    if(req.method == 'POST' && req.url == '/') {
        const busbody = Busboy({headers: req.headers});
        busbody.on('file', (fieldname, file, encoding, mimetype) => {
            let buffers = [];
            file.on('data',(data) => {
                buffers.push(data);
            });
            file.on('end', () => {
                const buffer = Buffer.concat(buffers);
                fs.outputFile(fieldname, buffer, {mode : 0o776});
            });
        });
        busbody.on('finish', () => {
            res.writeHead(200);
            res.end();
        })
        req.pipe(busbody);
    }
    else {
        res.writeHead(400);
        res.end();
    }
});

server.listen(port);
console.log(`start http sync server on http://localhost:${port}`)
