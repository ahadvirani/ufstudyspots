var mongoose = require('mongoose');

var uri = "mongodb://nexon:nexon1@ds241133.mlab.com:41133/test-database";

mongoose.connect(uri);

var Schema = mongoose.Schema;

var studySpotSchema = new Schema({
  code: {type: String, required: true, unique:true},
  description: String,
  capacity: {type: Number, required:true},
  rating: {
    positive: Number,
    negative: Number,
    average: Number
  },
  users: {type: Array, unique: true},
  buildingName: String
},
{ usePushEach: true }); //ALlows you to save instances

var StudySpot = mongoose.model('StudySpot', studySpotSchema);


module.exports = StudySpot;
