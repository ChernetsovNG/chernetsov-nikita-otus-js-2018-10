var request = require("request");
const port = 3000;

request(`http://localhost:${port}`, function(error, response, body) {
  console.log(body);
});
