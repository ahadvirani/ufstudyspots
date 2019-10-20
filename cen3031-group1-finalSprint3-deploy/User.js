var mongoose = require('mongoose');

var uri = "mongodb://nexon:nexon1@ds241133.mlab.com:41133/test-database";

mongoose.connect(uri);

var Schema = mongoose.Schema;

var User = new Schema({

  // User main properties
  userID: {type: String, required: true, unique: true},
  userPictureURL: {type: String, required: true},

  // User Optional Properties
  likes: {type: Object, unique: false},
  dislikes: {type: Object, unique: false},

  // Manages User study spots checkin
  studySpots: {
    joined_studyspot: Boolean,
    studySpot_ID: String,
  },

});



// module.exports = User;


// var mongoose = require('mongoose');

// var uri = "mongodb://nexon:nexon1@ds241133.mlab.com:41133/test-database";

// mongoose.connect(uri);

// var Schema = mongoose.Schema;

// var User = new Schema({
//   likes: {type: Array, unique:true},
//   dislikes: {type: Array, unique:true},
//   joined_studyspot:Boolean,
// });



// module.exports = User;
