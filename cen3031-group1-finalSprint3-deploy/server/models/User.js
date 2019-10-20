var mongoose = require('mongoose');

var uri = "mongodb://nexon:nexon1@ds241133.mlab.com:41133/test-database";

mongoose.connect(uri);

var Schema = mongoose.Schema;

var userSchema = new Schema({

  // User main properties
  userID: {type: String, required: true, unique: true},
  userPictureURL: {type: String, required: true},
  username: {type: String, required: true},

  // User Optional Properties
  likes: {type: Array, unique: false},
  dislikes: {type: Array, unique: false},

  // Manages User study spots checkin
  studySpot: {
    joined_studyspot: Boolean,
    code: String,
    building: String
  }

},
{ usePushEach: true });

var User = mongoose.model('User', userSchema);

module.exports = User;


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
