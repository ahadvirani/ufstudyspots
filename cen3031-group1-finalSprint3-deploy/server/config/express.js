var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    buildingsRouter = require('../routes/buildings.server.routes'),
    studySpotsRouter = require('../routes/studyspots.server.routes'),
    usersRouter = require('../routes/users.server.routes'),
    cors = require('cors');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  app.use(cors());

  /**TODO
  Serve static files */
  app.use('/', express.static(path.resolve('client')));

  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter);
  app.use('/api/buildings', buildingsRouter);
  app.use('/api/studyspots', studySpotsRouter);
  app.use('/api/users', usersRouter);

  /**TODO
  Go to homepage for all routes not specified */
  app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: './client'});
  });

  return app;
};
