var Building = require('./Building');
var User = require('./User');
var StudySpot = require('./StudySpot');

var bookstore = new Building({
  title: 'Book Library 101',
  address: '123 Book Drive',
  coordinates: {
    latitude:50.034934349,
    longitude:-83.20042039
  },
  created_at: new Date(),
  updated_at: new Date()
});

bookstore.displayTitle();

bookstore.addStudySpot('Room 201');

bookstore.save(function(err) {
  if(err) throw err;
  console.log('Building saved successfully');
});
