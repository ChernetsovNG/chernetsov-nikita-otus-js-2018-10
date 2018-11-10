'use strict'

const http = require('http');
const port = 3000;

let count = 0;

const handler = (req, res) => {
    setTimeout(() => {
        console.log(req.method);
        console.log(Date.now(), 'Server get incoming request');
        console.log(Date.now(), 'Server send response');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Hello');
        res.end();
    }, 1000);
};

const server = http.createServer(handler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
