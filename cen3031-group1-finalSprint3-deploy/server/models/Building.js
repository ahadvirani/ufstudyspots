var mongoose = require('mongoose');

var uri = "mongodb://nexon:nexon1@ds241133.mlab.com:41133/test-database";

mongoose.connect(uri);

var Schema = mongoose.Schema;

var buildingSchema = new Schema({
  title: String,
  address: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  created_at: Date,
  updated_at: Date,
  study_spots: Array,
},
{ usePushEach: true }); ////ALlows you to save instances

buildingSchema.methods.sayHey = function() {
  console.log('Hey!');
}

buildingSchema.methods.displayTitle = function() {
  console.log('The name of this building is '+this.title);
}

buildingSchema.methods.addStudySpot = function(studySpot) {
  this.study_spots.push(studySpot);
}

var Building = mongoose.model('Building', buildingSchema);

module.exports = Building;
