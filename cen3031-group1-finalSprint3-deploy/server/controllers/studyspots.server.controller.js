var mongoose = require('mongoose'),
StudySpot = require('../models/StudySpot.js');

exports.get_study_spot = function(req, res) {
  StudySpot.find({}, function(err, doc) {
    if(err) {
      res.status(404).send(err);
    }
    res.json(doc);
  });
}

exports.add_study_spot = function(req, res) {

  var studyspot = new StudySpot({
    code: req.body.code,
    description: req.body.description,
    capacity: req.body.capacity,
    buildingName: req.body.buildingName,
    users: [],
    rating: {
      positive: 0,
      negative: 0,
      average: 0
    }
  });

    studyspot.save(function(err) {
      if(err) {
       res.status(404).send(err);
      }

    });
}

exports.add_user = function(req, res) {
  StudySpot.findOne({code: req.body.code}, function(err, doc) {
    if(err) {
      throw err;
    }

    doc.users.push(req.body.userID);

    doc.save(function(err) {
      if(err) {
        throw err;
      }
    });

  });
}

exports.remove_user = function(req, res) {
  StudySpot.findOne({code: req.body.code}, function(err, doc) {
    if(err) {
      throw err;
    }

    if(doc.users.length > 0) {
      doc.users.splice(doc.users.indexOf(req.body.userID),1);
    }

    doc.save(function(err) {
      if(err) {
        throw err;
      }
    });

  });
}

exports.like_spot = function(req, res) {
  StudySpot.findOne({code: req.body.code}, function(err, doc) {
    if(err) {
      throw err;
    }

    doc.rating.positive += 1;

    if(doc.rating.negative > 0) {
      doc.rating.negative -= 1;
    }

    doc.save(function(err) {
      if(err) {
        throw err;
      }

    });
  });
}

exports.dislike_spot = function(req, res) {
  StudySpot.findOne({code: req.body.code}, function(err, doc) {
    if(err) {
      throw err;
    }

    doc.rating.negative += 1;

    if(doc.rating.positive > 0) {
      doc.rating.positive -= 1;
    }

    doc.save(function(err) {
        if(err) {
          throw err;
        }
    });

  });
}
