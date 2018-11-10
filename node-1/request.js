'use strict;'

var request = require("request");
const port = 3000;

requests_count = parseInt(process.argv[2]);  // количество запросов
request_type = process.argv[3];    // тип запроса: последовательный (consecutive), параллельный (parallel)

if (typeof requests_count !== 'number') {
    throw new Error(`Wrong requests count type: ${requests_count}. Use number type`);
}

if (requests_count < 1) {
    throw new Error(`Wrong requests count: ${requests_count}. Use number >= 1`);
}

if (request_type !== 'consecutive' && request_type !== 'parallel') {
    throw new Error(`Wrong requests type: ${request_type}. Use consecutive or parallel instead`);
}

console.log(`Requests count: ${requests_count}. Requests type: ${request_type}`)

if (request_type === 'consecutive') {
    for (let i = 0; i < requests_count; i++) {
        request(`http://localhost:${port}`, function (error, response, body) {
            console.log(body);
        });
    }
}
