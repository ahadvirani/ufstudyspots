var mongoose = require('mongoose'),
Building = require('../models/Building.js');

exports.buildings = function(req, res) {

  Building.find({}, function(err, doc) {
    if(err) {
      res.status(404).send(err);
    }
    res.json(doc);
  });

}

exports.add_study_spot = function(req, res) {
  Building.findOne({title: req.body.title}, function(err, doc) {
    if(err) {
      throw err;
    }
    
    doc.study_spots.push(req.body.studyspot);

    doc.save(function(err) {
      if(err) {
        throw err;
      }
    });

  });

}
