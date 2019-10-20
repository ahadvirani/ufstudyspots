angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://nightowls-study-spots.herokuapp.com/api/buildings');
    },

    getOne: function() {
      return $http.get('https://nightowls-study-spots.herokuapp.com/api/studyspots');
    },

	 create: function(listing) {
	  return $http.post('https://nightowls-study-spots.herokuapp.com/api/studyspots', listing);
    },

    update: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/buildings', listing);
    },

    userCreate: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/users', listing);
    },

    allUsers: function() {
      return $http.get('https://nightowls-study-spots.herokuapp.com/api/users');
    },

    addUser: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/studyspots/studyspot', listing);
    },

    removeUser: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/studyspots/removeuser', listing);
    },

    modifyUser: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/users/user', listing);
    },

    emptyUser: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/users/deletespot', listing);
    },

    spotLike: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/users/likespot', listing);
    },

    spotDislike: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/users/dislikespot', listing);
    },

    likeSpot: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/studyspots/likespot', listing);
    },

    dislikeSpot: function(listing) {
      return $http.post('https://nightowls-study-spots.herokuapp.com/api/studyspots/dislikespot', listing);
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
       return $http.delete('https://nightowls-study-spots.herokuapp.com/api/listings/'+id);
    }
  };

  return methods;
});
