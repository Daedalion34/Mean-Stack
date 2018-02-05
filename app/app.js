var app = angular.module('app', [
  'ngRoute',
  'uiGmapgoogle-maps'
  // dépendances
]);

app.config(['$routeProvider',
  function($routeProvider) {

    // Système de routage
    $routeProvider
      .when('/', {
        templateUrl: 'views/formulaire.view.html',
        controller: 'spotsGoogleMap'
      });
  }
]);

app.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});