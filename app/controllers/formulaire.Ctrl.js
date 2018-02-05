angular.module('app').controller('spotsGoogleMap', ['$scope', '$http', 'uiGmapGoogleMapApi', function($scope, $http, uiGmapGoogleMapApi) {

  $scope.map = {
    center: {
      latitude: 0,
      longitude: 0,
    },
    zoom: 8,
    bounds: {
      northeast: {
        latitude: 44.35565073283389,
        longitude: 5.644723330468764
      },
      southwest: {
        latitude: 42.76352836426411,
        longitude: 2.0467008695312643
      }
    }
  };

  if (navigator.geolocation) {

    console.log('geolocation disponible !');
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
    });
  }

  $scope.$watch('map.bounds', miseAJour, true);

  function miseAJour(newValue, oldValue, scope) {
    // console.log('gniark');

    console.log('========>');
    console.log(newValue);

    var longNE = "";
    var latNE = "";
    var longSW = "";
    var latSW = "";

    longNE = newValue.northeast.longitude;
    latNE = newValue.northeast.latitude;
    longSW = newValue.southwest.longitude;
    latSW = newValue.southwest.latitude;

    $http.post(
      "https://sportihome.com/api/spots/getAllMarkersInBounds/" + longSW + "," + latSW + "/" + longNE + "," + latNE
    ).then(function mySuccess(response) {
      $scope.mapMarkers = response.data;
      console.log(response.data);

    }, function myError(response) {
      console.log('erreur');
      console.log(response);
    });
  }

  $scope.debug = function() {
    console.log($scope.map.bounds);
  }



  var styleMap = [{
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "administrative",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{
          "color": "#000000"
        },
        {
          "weight": 1
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{
          "color": "#000000"
        },
        {
          "weight": 0.8
        }
      ]
    },
    {
      "featureType": "landscape",
      "stylers": [{
        "color": "#ffffff"
      }]
    },
    {
      "featureType": "water",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "transit",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#ffffff"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#000000"
      }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }
  ];
  $scope.options = {
    styles: styleMap
  };
}]);