'use strict';

/**
 * @ngdoc function
 * @name movieSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the movieSearchApp
 */

var app= angular.module('movieSearchApp');

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider 
      .state('home', {
          url: '/home',
          templateUrl: '../../views/main.html',
          controller: 'homeController'
      })
      .state('searchList', { 
          url: '/searchList/:category/:name',
          templateUrl: '../../views/list.html',
          controller: 'searchListController'
      })
      .state('searchMovieDetails', {
          url: '/searchMovieDetails/:movieid',
          templateUrl: '../../views/movieDetails.html',
          controller: 'movieDetailsController'
      })
      .state('searchTvShowDetails', {
          url: '/searchTvShowDetails/:tvshowid',
          templateUrl: '../../views/tvShowDetails.html',
          controller: 'tvDetailsController'
      })

});

app.controller('homeController', ['$scope', 'myFactory', '$state', 'myService', function ($scope, myFactory, $state, myService) {

  $scope.selected = "";
  $scope.options = myFactory.options;

  $scope.search = function () {
      $state.go("searchList", { category: $scope.selected, name: $scope.searchByTitle });;
  }

}])

app.controller('searchListController', ['$scope', 'myFactory', '$state', 'myService', '$stateParams', '$http', function ($scope, myFactory, $state, myService, $stateParams, $http) {

  console.log("In Search List Controller");
  $scope.options = myFactory.options;
  var title = $stateParams.name;

  var categoryId = $stateParams.category;

  myService.name = $stateParams.name;
  myService.id = $stateParams.category;


  $scope.search = function () {
      $state.go("searchList", { category: $scope.selected, name: $scope.searchByTitle });
  }


  if (categoryId === "1") {

      $scope.showMovieDetails = false;
      $scope.showTvDetails = true;

      $http.get("https://api.themoviedb.org/3/search/tv?api_key=1dc919d8c79ca7dfb642e14d157e8704&query=" + title + "")
          .then(successCallback, errorCallback);

      function successCallback(response) {
          console.log(response);
          $scope.tvShows = response.data.results;

          for (var i = 0; i < $scope.tvShows.length; i++) {
              $scope.tvShows[i].original_language = getLanguageName($scope.tvShows[i].original_language);
              $scope.tvShows[i].poster_path = "https://image.tmdb.org/t/p/" + "w200" + $scope.tvShows[i].poster_path;
          }
      }
      function errorCallback(error) { }
  }



  if (categoryId === "2") {
    console.log("Movie List option Selected");

      $scope.showMovieDetails = true;
      $scope.showTvDetails = false;

      $http.get("https://api.themoviedb.org/3/search/movie?api_key=1dc919d8c79ca7dfb642e14d157e8704&query=" + title + "")
          .then(successCallback, errorCallback);

      function successCallback(response) {
          console.log("Response is " + response);

          $scope.movies = response.data.results;

          console.log($scope.movies);

          for (var i = 0; i < $scope.movies.length; i++) {
              $scope.movies[i].original_language = getLanguageName($scope.movies[i].original_language);
              $scope.movies[i].poster_path = "https://image.tmdb.org/t/p/" + "w200" + $scope.movies[i].poster_path;
          }
        }

          function errorCallback(error) { }
      

  }


  $scope.sort = function (keyname) {
      $scope.sortKey = keyname;
      $scope.reverse = !$scope.reverse;
  }

  $scope.movieDetails = function (a) {
      $state.go("searchMovieDetails", { movieid: a.id });
  }

  $scope.tvShowDetails = function (a) {
      $state.go("searchTvShowDetails", { tvshowid: a.id });
  }

}])

app.controller("movieDetailsController", ['$scope', 'myFactory', '$state', 'myService', '$stateParams', '$http', function ($scope, myFactory, $state, myService, $stateParams, $http) {

  var id = $stateParams.movieid;
  $scope.options = myFactory.options;
  $scope.cast = [];
  $scope.crew = [];
  $scope.details = [];
  $scope.director = {};

  $http.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=1dc919d8c79ca7dfb642e14d157e8704&language=en-US&append_to_response=credits,images")
      .then(successCallback, errorCallback);

  function successCallback(response) {

      console.log(response);
      $scope.details = response.data;
      $scope.details.poster_path = "https://image.tmdb.org/t/p/" + "w300" + $scope.details.poster_path;

      if ($scope.details.backdrop_path == null) {
          $scope.details.backdrop_path = "https://dummyimage.com/1400x450/000000/000";
      } else {
          $scope.details.backdrop_path = "https://image.tmdb.org/t/p/" + "w1400_and_h450_face" + $scope.details.backdrop_path;
      }


      $scope.cast = $scope.details.credits.cast;
      $scope.crew = $scope.details.credits.crew;

      for (var i = 0; i < $scope.cast.length; i++) {
          $scope.cast[i].profile_path = "https://image.tmdb.org/t/p/" + "w138_and_h175_face" + $scope.cast[i].profile_path;
          console.log($scope.cast[i].profile_path);
        }

      for (var i = 0; i < $scope.crew.length; i++) {
          if ($scope.crew[i].department === 'Directing') {
              $scope.director.name = $scope.crew[i].name;
              $scope.director.profile_path = "https://image.tmdb.org/t/p/" + "w138_and_h175_face" + $scope.crew[i].profile_path;
          }
      }
  }

  function errorCallback(error) { }

  $scope.search = function () {
      $state.go("searchList", { category: $scope.selected, name: $scope.searchByTitle });
  }

}])


app.controller("tvDetailsController", ['$scope', '$state', 'myService', 'myFactory', '$stateParams', '$http', function ($scope, $state, myService, myFactory, $stateParams, $http) {

  var id = $stateParams.tvshowid;
  $scope.options = myFactory.options;

  $scope.cast = [];
  $scope.crew = [];
  $scope.details = [];
  $scope.director = {};

  $http.get("https://api.themoviedb.org/3/tv/" + id + "?api_key=1dc919d8c79ca7dfb642e14d157e8704&language=en-US&append_to_response=credits,images")
      .then(successCallback, errorCallback);

  function successCallback(response) {
      console.log(response);

      $scope.details = response.data;
      $scope.cast = $scope.details.credits.cast;
      $scope.crew = $scope.details.credits.crew;

      console.log("cast is " + $scope.cast);
      console.log("crew is " + $scope.crew);

      $scope.details.poster_path = "https://image.tmdb.org/t/p/" + "w300" + $scope.details.poster_path;

      if ($scope.details.backdrop_path == null) {
          $scope.details.backdrop_path = "https://dummyimage.com/1400x450/000000/000";
      } else {
          $scope.details.backdrop_path = "https://image.tmdb.org/t/p/" + "w1400_and_h450_face" + $scope.details.backdrop_path;
      }


      for (var i = 0; i < $scope.cast.length; i++) {
          $scope.cast[i].profile_path = "https://image.tmdb.org/t/p/" + "w138_and_h175_face" + $scope.cast[i].profile_path;
      }

      for (var i = 0; i < $scope.crew.length; i++) {
          if ($scope.crew[i].department === 'Directing') {
              $scope.director.name = $scope.crew[i].name;
              $scope.director.profile_path = "https://image.tmdb.org/t/p/" + "w138_and_h175_face" + $scope.crew[i].profile_path;
          }
      }

  }

  function errorCallback(error) { }

  $scope.search = function () {
      $state.go("searchList", { category: $scope.selected, name: $scope.searchByTitle });
  }

}])


app.service("myService", function () {
  this.name = "";
  this.id = "";
})


app.factory("myFactory", function ($http) {
  return {
      options: [
          {
              value: '1',
              label: 'Tv Shows'
          },
          {
              value: '2',
              label: 'Movies'
          }

      ]
  }
});