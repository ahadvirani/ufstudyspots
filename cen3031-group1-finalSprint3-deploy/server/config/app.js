var config = require('./config'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    https = require('https'),
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen(process.env.PORT, '0.0.0.0');
  /*app.listen(config.port, function() {
    console.log('App listening on port', config.port);
  });*/

/*https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(config.port, function () {
  console.log('Example app listening on port 5001! Go to https://localhost:5001/')
})*/

};
