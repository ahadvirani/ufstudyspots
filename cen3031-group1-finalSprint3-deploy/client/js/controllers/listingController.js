angular.module('listings').controller('ListingsController', ['$scope','$window','$log', 'Listings',
  function($scope, $window, $log, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.allUsers().then(function(response) {
      $scope.allUsers = response.data;
      console.log($scope.allUsers);
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    document.getElementById("upVote").style.color = "#000";

    $scope.detailedInfo = undefined;

    $scope.buildingName = undefined;

    $scope.studyspot = undefined;

    $scope.capacity = undefined;

    $scope.description = undefined;

    $scope.users = undefined;

    $scope.positive = undefined;

    $scope.negative = undefined;

    $scope.average = undefined;

    $scope.userID = undefined;

    $scope.username = undefined;

    $scope.userPicURL = undefined;

    $scope.checkedIn = false;

    $scope.joinedCode = "";

    $scope.joinedBuilding = "";

    $scope.joinedStudySpot = false;

    $scope.spotLiked = false;

    $scope.spotDisliked = false;

    $scope.spotExists = false;

    $scope.fbLogin = function() {

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

    };

  $scope.finished = function(index) {
    alert($scope.studyspots[index].average);
  };

    $scope.studyspots = [];

    $scope.getStudySpot = function(code) {
      document.getElementById("upVote").style.color = "#000";
      document.getElementById("downVote").style.color = "#000";
      $scope.studyspot = code;
      Listings.getOne().then(function(response) {
        var spots = response.data;
        spots.forEach(function(e) {
          if(e.code == $scope.studyspot) {
            if((e.rating.positive == 0) && (e.rating.negative == 0)) {
              $scope.average = 0;
              $scope.rating = '<span class="fa fa-star checked"></span>';
            }
            else {
              $scope.average = Math.floor( (e.rating.positive/(e.rating.positive+e.rating.negative)) * 100);
              if ($scope.average <= 20 && $scope.average > 10) {
                $scope.rating = '<span class="fa fa-star checked"></span>';
              }
              else if ($scope.average <= 40 && $scope.average > 20) {
                $scope.rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
              }
              else if ($scope.average <= 60 && $scope.average > 40) {
                $scope.rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
              }
              else if ($scope.average <= 80 && $scope.average > 60) {
                $scope.rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
              }
              else if ($scope.average <= 100 && $scope.average > 80) {
                $scope.rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
              }
            }
            $scope.capacity = e.capacity;
            $scope.description = e.description;
            $scope.positive = e.rating.positive;
            $scope.negative = e.rating.negative;
            $scope.users = e.users.length;

            $scope.allUsers.forEach(function(g) {
              if(g.userID == $scope.userID) {
                if(g.studySpot.joined_studyspot == true) {
                  if(g.studySpot.code == $scope.studyspot) {
                    $scope.joinedStudySpot = true;
                  }
                  else {
                    $scope.joinedStudySpot = false;
                  }
                }
                else {
                  $scope.joinedStudySpot = false;
                }
              }
            });
          }
        });
      }, function(error) {
        console.log('Unable to retrieve study spots:', error);
      });
    };

    $scope.initStudySpot = function(code) {
      Listings.getOne().then(function(response) {
        var spots = response.data;
        spots.forEach(function(e) {
          if(e.code == code) {
            $scope.studyspots.forEach(function(f) {
              if(f.code == e.code) {
                  var num = $scope.studyspots.indexOf(f);
                  $scope.studyspots[num].users = e.users.length;
                  $scope.studyspots[num].capacity = e.capacity;
                  if((e.rating.positive == 0) && (e.rating.negative == 0)) {
                    $scope.studyspots[num].average = 0;
                    $scope.studyspots[num].rating = '<span class="fa fa-star checked"></span>';

                  }
                  else {
                    $scope.studyspots[num].average = Math.floor( (e.rating.positive/(e.rating.positive+e.rating.negative)) * 100);
                    if ($scope.studyspots[num].average <= 20 && $scope.studyspots[num].average > 10) {
                      $scope.studyspots[num].rating = '<span class="fa fa-star checked"></span>';
                    }
                    else if ($scope.studyspots[num].average <= 40 && $scope.studyspots[num].average > 20) {
                      $scope.studyspots[num].rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
                    }
                    else if ($scope.studyspots[num].average <= 60 && $scope.studyspots[num].average > 40) {
                      $scope.studyspots[num].rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
                    }
                    else if ($scope.studyspots[num].average <= 80 && $scope.studyspots[num].average > 60) {
                      $scope.studyspots[num].rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
                    }
                    else if ($scope.studyspots[num].average <= 100 && $scope.studyspots[num].average > 80) {
                      $scope.studyspots[num].rating = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
                    }
                  }
              }
            });
          }
        });
        return;
      }, function(error) {
        console.log('Unable to retrieve study spots:', error);
      });
    };

    $scope.populate = function() {
      $scope.studyspots = [];

      $scope.listings.forEach(function(e) {
        $scope.buildingName = document.getElementById('infoTrans').value;
        if(e.title == $scope.buildingName) {
          e.study_spots.forEach(function(f) {

            var obj = {
              code: f,
              users: 0,
              capacity: 0,
              average: 0,
              rating: '<span class="fa fa-star checked"></span>'
            };

            $scope.studyspots.push(obj);
          });
        }
      });
    };

    $scope.transferID = function() {
      $scope.userID = document.getElementById("infoTrans2").value;
      $scope.allUsers.forEach(function(e) {
        if(e.userID == $scope.userID) {
          if(e.studySpot.code == "") {
            document.getElementById("navvyBar").innerHTML = '<a class="nav-item nav-link"  style="color:#000!important;">Checked In: None <span class="sr-only">(current)</span></a>';
            document.getElementById("mapbox-checked-in").textContent = "None";
          }
          else {
            document.getElementById("navvyBar").innerHTML = '<a class="nav-item nav-link"  style="color:#000!important;">Checked In: '+e.studySpot.code+', '+e.studySpot.building+'<span class="sr-only">(current)</span></a>';
            document.getElementById("mapbox-checked-in").textContent = e.studySpot.building;
          }
        }
      });
    };

    $scope.transferName = function() {
      $scope.username = document.getElementById("infoTrans3").value;
    };

    $scope.transferPic = function() {
      $scope.userPicURL = document.getElementById("infoTrans4").value;
      $scope.createUser();
    };

    $scope.likeSpot = function() {

      $scope.spotLiked = false;
      $scope.allUsers.forEach(function(e) {
        if(e.userID == $scope.userID) {
          e.likes.forEach(function(f) {
            if(f == $scope.studyspot) {
              $scope.spotLiked = true;
            }
          });
        }
      });

      if($scope.spotLiked == true) {
        alert("You have liked this study spot already.");
      }
      else {
        var obj = {
          userID: $scope.userID,
          code: $scope.studyspot
        };

        Listings.spotLike(obj).then(function(res) {

        }, function(err) {
          if(err) {
            throw err;
          }
        });

        var obj2 = {
          code: $scope.studyspot
        };

        Listings.likeSpot(obj2).then(function(res) {

        }, function(err) {
          if(err) {
            throw err;
          }
        });

        document.getElementById("upVote").style.color = "#007bff";

        $scope.spotLiked = true;

        $window.location.reload();
      }
    };

    $scope.dislikeSpot = function() {
      $scope.spotDisliked = false;
      $scope.allUsers.forEach(function(e) {
        if(e.userID == $scope.userID) {
          e.dislikes.forEach(function(f) {
            if(f == $scope.studyspot) {
              $scope.spotDisliked = true;
            }
          });
        }
      });

      if($scope.spotDisliked == true) {
        alert("You have disliked this study spot already.");
      }
      else {
        var obj = {
          userID: $scope.userID,
          code: $scope.studyspot
        };

        Listings.spotDislike(obj).then(function(res) {

        }, function(err) {
          if(err) {
            throw err;
          }
        });

        var obj2 = {
          code: $scope.studyspot
        };

        Listings.dislikeSpot(obj2).then(function(res) {

        }, function(err) {
          if(err) {
            throw err;
          }
        });

        document.getElementById("downVote").style.color = "#dc3545";

        $scope.spotDisliked = true;

        $window.location.reload();
      }
    };

    $scope.checkOutHandle = function() {
      console.log($scope.studyspot);
      console.log($scope.userID);

      var obj = {
        code: $scope.studyspot,
        userID: $scope.userID
      };

      console.log(obj);

      Listings.removeUser(obj).then(function(res) {
      }, function(err) {
        if(err) {
          throw err;
        }
      });

      var obj2 = {
        userID: $scope.userID
      };

      Listings.emptyUser(obj2).then(function(res) {

      }, function(err) {
        throw err;
      });

      $scope.checkedIn = false;

      $window.location.reload();
    };

    $scope.checkInHandle = function() {

      $scope.allUsers.forEach(function(e) {
        if(e.userID == $scope.userID) {
          if(e.studySpot.joined_studyspot == true) {
            $scope.checkedIn = true;
            $scope.joinedCode = e.studySpot.code;
            $scope.joinedBuilding = e.studySpot.building;
          }
        }
      });

      if($scope.checkedIn == true) {
        return false;
      }
      else {
        $scope.joinedCode = $scope.studyspot;
        $scope.joinedBuilding = $scope.buildingName;

        var obj = {
          code: $scope.studyspot,
          userID: $scope.userID
        };

        console.log(obj);

        Listings.addUser(obj).then(function(res) {
        }, function(err) {
          if(err) {
              throw err;
          }
        });

        var obj2 = {
          userID: $scope.userID,
          code: $scope.studyspot,
          building: $scope.buildingName
        };

        Listings.modifyUser(obj2).then(function(res) {

        }, function(err) {
          if(err) {
            throw err;
          }
        });

        $scope.checkedIn = true;

        $window.location.reload();
      }

    };

    $scope.createUser = function() {
      var obj = {
        userID: $scope.userID,
        userPictureURL: $scope.userPicURL,
        username: $scope.username
      }
      Listings.userCreate(obj).then(function(res) {
        console.log(res);
        Listings.allUsers().then(function(response) {
          $scope.allUsers = response.data;
          console.log($scope.allUsers);
        }, function(error) {
          console.log('Unable to retrieve users:', error);
        });
      }, function(err) {
        console.log(err);
      });

    };

    $scope.addStudySpot = function() {
      $scope.spotExists = false;
      $scope.studyspots.forEach(function(e) {
        if(e.code == $scope.newListing.code) {
          $scope.spotExists = true;
        }
      });
      if(!($scope.newListing.code.length > 0) || !($scope.newListing.capacity.length > 0)) {
        return false;
      }
      else if($scope.spotExists == true) {
        alert('This classroom already exists.');
        return false;
      }
      else {
        var buildingName = $scope.buildingName;
        var obj = {
          title: buildingName,
          studyspot: $scope.newListing.code
        }

        Listings.update(obj).then(function(res) {

          Listings.getAll().then(function(response) {
            $scope.listings = response.data;
          }, function(err) {
            console.log(err);
          });
        }, function(err) {
          console.log(err);
        });

        obj = {
          code: $scope.newListing.code,
          description: $scope.newListing.description,
          capacity: $scope.newListing.capacity,
          buildingName: $scope.buildingName
        };

        Listings.create(obj).then(function(res) {

          Listings.getAll().then(function(response) {
            $scope.listings = response.data;
          }, function(err) {
            console.log(err);
          });
        }, function(err) {
          console.log(err);
        });

        $window.location.reload();
      }
    };


    $scope.addListing = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
   var obj = {
     code:$scope.newListing.code,
     name:$scope.newListing.name,
     address:$scope.newListing.address
   };
   Listings.create(obj).then(function(res) {

     Listings.getAll().then(function(response) {
       $scope.listings = response.data;
     }, function(error) {
       console.log('Unable to retrieve listings:', error);
     });
     $window.location.reload();
   }, function(error) {
     console.log('Unable to add listing:', error);
   });
    };

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
       Listings.delete($scope.listings[index]._id).then(function(res) {
         Listings.getAll().then(function(response) {
           $scope.listings = response.data;
         }, function(error) {
           console.log('Unable to retrieve listings:', error);
         });
       }, function(error) {
         console.log('Unable to delete listing:', error);
       });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
