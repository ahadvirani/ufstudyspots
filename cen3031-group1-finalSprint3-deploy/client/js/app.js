/* register the modules the application depends upon here*/
angular.module('listings', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['listings']);

app.directive('myStars', function(){
    return {
        scope: {
            rating: '=rating'
        },
        template: '<span></span>',
        link: function(scope, elem, attrs){
          var val = scope.rating;
          elem.html(val);
        }
    };
});

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

function initChange(f) {
  var e = document.getElementById("infoTrans");
  e.value = f;
  e.focus();
  $('#menu-icon').addClass('on');
  $('#menu').addClass('active');
  $('header').addClass('on');
  $('#menu-icon').addClass('active');
  $('#menu-icon').css("opacity", 1);
}

function usernameChange(id, name, pic) {
  var e = document.getElementById("infoTrans2");
  e.value = id;
  e.focus();

  var e2 = document.getElementById("infoTrans3");
  e2.value = name;
  e2.focus();

  var e3 = document.getElementById("infoTrans4");
  e3.value = pic;
  e3.focus();
}

var getImagePath =function(building) {
  var imgSrc = building + ".jpg";
  return imgSrc;
};

function changeImgPath(building) {
  var imgSrc = building + ".jpg";
  var imgSrc1 = building + "1.jpg";
  var imgName =  document.getElementById("popImg").getAttribute("src");
  if (imgName === imgSrc) {

    document.getElementById("popImg").src = imgSrc1;
  }
  else {
    document.getElementById("popImg").src = imgSrc;
  }
}

function loadMenu() {
}
$(document).ready(function() {

  $('#menu-icon').click(function(){
    if($('#menu-icon').hasClass('on')) {
    $(this).removeClass('on');
    $('#menu').removeClass('active');
    $('header').removeClass('on');
    $('#menu-icon').removeClass('active');
    $('#menu-icon').css("opacity", 0);
  }

  });

 });
