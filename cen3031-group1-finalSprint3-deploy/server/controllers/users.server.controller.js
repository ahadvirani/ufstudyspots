var mongoose = require('mongoose'),
User = require('../models/User.js');

exports.add_user = function(req, res) {
  var user = new User({
    userID: req.body.userID,
    userPictureURL: req.body.userPictureURL,
    username: req.body.username,

    // User Optional Properties
    likes: [],
    dislikes: [],

    // Manages User study spots checkin
    studySpot: {
      joined_studyspot: false,
      code: "",
      building: ""
    }
  });

  user.save(function(err) {
    if(err) {
      res.status(404).send(err);
    }
  });
}

exports.get_users = function(req, res) {
  User.find({}, function(err, doc) {
    if(err) {
      res.status(404).send(err);
    }
    res.json(doc);
  });
}

exports.join_study_spot = function(req, res) {
  User.findOne({userID: req.body.userID}, function(err, doc) {
    if(err) {
      throw err;
    }
    doc.studySpot.joined_studyspot = true;
    doc.studySpot.code = req.body.code;
    doc.studySpot.building = req.body.building;

    doc.save(function(err) {
      if(err) {
        throw err;
      }
    });

  });

}

exports.leave_study_spot = function(req, res) {
  User.findOne({userID: req.body.userID}, function(err, doc) {
    if(err) {
      throw err;
    }
    doc.studySpot.joined_studyspot = false;
    doc.studySpot.code = "";
    doc.studySpot.building = "";

    doc.save(function(err) {
      if(err) {
        throw err;
      }
    });
  });
}

exports.like_spot = function(req, res) {
  User.findOne({userID: req.body.userID}, function(err, doc) {
    if(err) {
      throw err;
    }

    console.log("HEY");

    doc.likes.push(req.body.code);

    if(doc.dislikes.indexOf(req.body.code) != -1) {
      doc.dislikes.splice(doc.dislikes.indexOf(req.body.code),1);
    }

    doc.save(function(err) {
      if(err) {
        throw err;
      }
    });
  });
}

exports.dislike_spot = function(req, res) {
  User.findOne({userID: req.body.userID}, function(err, doc) {
    if(err) {
      throw err;
    }

    doc.dislikes.push(req.body.code);

    if(doc.likes.indexOf(req.body.code) != -1) {
      doc.likes.splice(doc.likes.indexOf(req.body.code),1);
    }

    doc.save(function(err) {
      if(err) {
        throw err;
      }
    });
  });
}
