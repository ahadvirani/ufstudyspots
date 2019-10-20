//This file holds any configuration variables we may need
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb://nexon:nexon1@ds241133.mlab.com:41133/test-database', //place the URI of your mongo database here.
  },
  port: 5001
};
