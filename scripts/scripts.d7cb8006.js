"use strict";var app=angular.module("movieSearchApp",["ui.router","angularUtils.directives.dirPagination"]);$(window).scroll(function(){var a=$(window).scrollTop();a>100?$("#header_nav").addClass("small"):$("#header_nav").removeClass("small")});var app=angular.module("movieSearchApp",["ui.router","angularUtils.directives.dirPagination"]);app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/home"),a.state("home",{url:"/home",templateUrl:"../../views/templates/main.html",controller:"homeController"}).state("searchList",{url:"/searchList/:category/:name",templateUrl:"../../views/templates/list.html",controller:"searchListController"}).state("searchMovieDetails",{url:"/searchMovieDetails/:movieid",templateUrl:"../../views/templates/movieDetails.html",controller:"movieDetailsController"}).state("searchTvShowDetails",{url:"/searchTvShowDetails/:tvshowid",templateUrl:"../../views/templates/tvShowDetails.html",controller:"tvDetailsController"})}]),app.controller("homeController",["$scope","myFactory","$state","myService",function(a,b,c,d){a.selected="",a.options=b.options,a.search=function(){c.go("searchList",{category:a.selected,name:a.searchByTitle})}}]),app.controller("searchListController",["$scope","myFactory","$state","myService","$stateParams","$http",function(a,b,c,d,e,f){function g(b){console.log(b),a.tvShows=b.data.results;for(var c=0;c<a.tvShows.length;c++)a.tvShows[c].original_language=getLanguageName(a.tvShows[c].original_language),a.tvShows[c].poster_path="https://image.tmdb.org/t/p/w200"+a.tvShows[c].poster_path}function h(a){}function g(b){console.log("Response is "+b),a.movies=b.data.results,console.log(a.movies);for(var c=0;c<a.movies.length;c++)a.movies[c].original_language=getLanguageName(a.movies[c].original_language),a.movies[c].poster_path="https://image.tmdb.org/t/p/w200"+a.movies[c].poster_path}function h(a){}console.log("In Search List Controller"),a.options=b.options;var i=e.name,j=e.category;d.name=e.name,d.id=e.category,a.search=function(){c.go("searchList",{category:a.selected,name:a.searchByTitle})},"1"===j&&(a.showMovieDetails=!1,a.showTvDetails=!0,f.get("https://api.themoviedb.org/3/search/tv?api_key=1dc919d8c79ca7dfb642e14d157e8704&query="+i).then(g,h)),"2"===j&&(console.log("Movie List option Selected"),a.showMovieDetails=!0,a.showTvDetails=!1,f.get("https://api.themoviedb.org/3/search/movie?api_key=1dc919d8c79ca7dfb642e14d157e8704&query="+i).then(g,h)),a.sort=function(b){a.sortKey=b,a.reverse=!a.reverse},a.movieDetails=function(a){c.go("searchMovieDetails",{movieid:a.id})},a.tvShowDetails=function(a){c.go("searchTvShowDetails",{tvshowid:a.id})}}]),app.controller("movieDetailsController",["$scope","myFactory","$state","myService","$stateParams","$http",function(a,b,c,d,e,f){function g(b){console.log(b),a.details=b.data,a.details.poster_path="https://image.tmdb.org/t/p/w300"+a.details.poster_path,null==a.details.backdrop_path?a.details.backdrop_path="https://dummyimage.com/1400x450/000000/000":a.details.backdrop_path="https://image.tmdb.org/t/p/w1400_and_h450_face"+a.details.backdrop_path,a.cast=a.details.credits.cast,a.crew=a.details.credits.crew;for(var c=0;c<a.cast.length;c++)a.cast[c].profile_path="https://image.tmdb.org/t/p/w138_and_h175_face"+a.cast[c].profile_path,console.log(a.cast[c].profile_path);for(var c=0;c<a.crew.length;c++)"Directing"===a.crew[c].department&&(a.director.name=a.crew[c].name,a.director.profile_path="https://image.tmdb.org/t/p/w138_and_h175_face"+a.crew[c].profile_path)}function h(a){}var i=e.movieid;a.options=b.options,a.cast=[],a.crew=[],a.details=[],a.director={},f.get("https://api.themoviedb.org/3/movie/"+i+"?api_key=1dc919d8c79ca7dfb642e14d157e8704&language=en-US&append_to_response=credits,images").then(g,h),a.search=function(){c.go("searchList",{category:a.selected,name:a.searchByTitle})}}]),app.controller("tvDetailsController",["$scope","$state","myService","myFactory","$stateParams","$http",function(a,b,c,d,e,f){function g(b){console.log(b),a.details=b.data,a.cast=a.details.credits.cast,a.crew=a.details.credits.crew,console.log("cast is "+a.cast),console.log("crew is "+a.crew),a.details.poster_path="https://image.tmdb.org/t/p/w300"+a.details.poster_path,null==a.details.backdrop_path?a.details.backdrop_path="https://dummyimage.com/1400x450/000000/000":a.details.backdrop_path="https://image.tmdb.org/t/p/w1400_and_h450_face"+a.details.backdrop_path;for(var c=0;c<a.cast.length;c++)a.cast[c].profile_path="https://image.tmdb.org/t/p/w138_and_h175_face"+a.cast[c].profile_path;for(var c=0;c<a.crew.length;c++)"Directing"===a.crew[c].department&&(a.director.name=a.crew[c].name,a.director.profile_path="https://image.tmdb.org/t/p/w138_and_h175_face"+a.crew[c].profile_path)}function h(a){}var i=e.tvshowid;a.options=d.options,a.cast=[],a.crew=[],a.details=[],a.director={},f.get("https://api.themoviedb.org/3/tv/"+i+"?api_key=1dc919d8c79ca7dfb642e14d157e8704&language=en-US&append_to_response=credits,images").then(g,h),a.search=function(){b.go("searchList",{category:a.selected,name:a.searchByTitle})}}]),app.service("myService",function(){this.name="",this.id=""}),app.factory("myFactory",["$http",function(a){return{options:[{value:"1",label:"Tv Shows"},{value:"2",label:"Movies"}]}}]),angular.module("movieSearchApp").run(["$templateCache",function(a){a.put("views/templates/list.html",'<div class="container" id="search"> <form name="valid_select"> <div class="col-md-2"> <div class="form-group"> <select class="form-control" ng-model="selected" required> <option value="">Select Category </option> <option ng-repeat="item in options" value="{{item.value}}">{{item.label}}</option> </select> </div> </div> <div class="col-md-9"> <div class="form-group"> <input type="text" class="form-control" ng-model="searchByTitle" placeholder="search" required> </div> </div> <span> <button class="btn btn-primary" ng-click="search()" ng-disabled="valid_select.$invalid" type="button">Go!</button> </span> </form> </div> <div class="container" ng-if="showTvDetails"> <table class="table table-striped" style="background-color:white"> <thead> <tr> <th ng-click="sort(\'name\')"> Name <span class="glyphicon sort-icon" ng-show=" sortKey === \'name\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th ng-click="sort(\'original_language\')"> Language <span class="glyphicon sort-icon" ng-show=" sortKey === \'original_language\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th ng-click="sort(\'first_air_date\')"> First Air Date <span class="glyphicon sort-icon" ng-show=" sortKey === \'first_air_date\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th ng-click="sort(\'vote_average\')"> Rating <span class="glyphicon sort-icon" ng-show=" sortKey === \'vote_average\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th> &nbsp;</th> </tr> </thead> <tbody> <tr dir-paginate="a in tvShows| itemsPerPage: 5 | filter: searchByTitle | orderBy:sortKey:reverse"> <td> <img class="poster" ng-src="{{ a.poster_path }}" width="75"> {{a.name}} </td> <td> {{a.original_language}} </td> <td> {{a.first_air_date}} </td> <td> {{a.vote_average}}</td> <td> <button ng-click="tvShowDetails(a)" class="btn btn-info"> View Details </button> </td> </tr> </tbody> </table> <dir-pagination-controls max-size="5" direction-links="true" boundary-links="true"> </dir-pagination-controls> </div> <div class="container" ng-if="showMovieDetails"> <table class="table table-striped" style="background-color:white"> <thead> <tr> <th ng-click="sort(\'title\')"> Title <span class="glyphicon sort-icon" ng-show=" sortKey === \'title\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th ng-click="sort(\'original_language\')"> Language <span class="glyphicon sort-icon" ng-show=" sortKey === \'original_language\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th ng-click="sort(\'release_date\')"> Release Date <span class="glyphicon sort-icon" ng-show=" sortKey === \'release_date\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th ng-click="sort(\'vote_average\')"> Rating <span class="glyphicon sort-icon" ng-show=" sortKey === \'vote_average\' " ng-class="{\'glyphicon-chevron-up\': reverse,\'glyphicon-chevron-down\': !reverse}"></span> </th> <th> &nbsp;</th> </tr> </thead> <tbody> <tr dir-paginate="a in movies| itemsPerPage: 5 | filter: searchByTitle | orderBy:sortKey:reverse"> <td> <img class="poster" ng-src="{{ a.poster_path }}" width="75"> {{a.title}} </td> <td> {{a.original_language}} </td> <td> {{a.release_date}} </td> <td> {{a.vote_average}}</td> <td> <button ng-click="movieDetails(a)" class="btn btn-info"> View Details </button> </td> </tr> </tbody> </table> <dir-pagination-controls max-size="5" direction-links="true" boundary-links="true"> </dir-pagination-controls> </div>'),a.put("views/templates/main.html",'<div class="container" id="search1"> <form name="valid_select"> <div class="col-md-2"> <div class="form-group"> <select class="form-control" ng-model="selected" required> <option value="">Select Category </option> <option ng-repeat="item in options" value="{{item.value}}">{{item.label}}</option> </select> </div> </div> <div class="col-md-9"> <div class="form-group"> <input type="text" class="form-control" ng-model="searchByTitle" placeholder="search" required> </div> </div> <span> <button class="btn btn-primary" ng-click="search()" ng-disabled="valid_select.$invalid" type="button">Go!</button> </span> </form> </div>'),a.put("views/templates/movieDetails.html",'<div class="container" id="search"> <form name="valid_select"> <div class="col-md-2"> <div class="form-group"> <select class="form-control" ng-model="selected" required> <option value="">Select Category </option> <option ng-repeat="item in options" value="{{item.value}}">{{item.label}}</option> </select> </div> </div> <div class="col-md-9"> <div class="form-group"> <input type="text" class="form-control" ng-model="searchByTitle" placeholder="search" required> </div> </div> <span> <button class="btn btn-primary" ng-click="search()" ng-disabled="valid_select.$invalid" type="button">Go!</button> </span> </form> </div> <div class="container"> <div class="row"> <div class="backdrop"> <img ng-src="{{details.backdrop_path}}">  </div> <div class="col-md-4"> <a href="#"> <img ng-src="{{details.poster_path}}" height="80%"> </a> </div> <div class="col-md-8" id="img_details"> <h1 style="font-family: \'Source Sans Pro\', Arial, Helvetica, sans-serif; font-size: xx-large ; font-weight: 300px; margin-bottom: 20px"> {{details.title}} </h1> <h4> <b> Overview </b> </h4> <p> {{details.overview}} </p> <p> <b> Directed By: </b> {{director.name}} </p> <p> <b> Genres: </b> <span ng-repeat="y in details.genres"> {{" "}} {{y.name}} </span> </p> <p> <b> Duration: </b> {{details.runtime + " min"}} </p> </div> </div> <div> <h3 class="Cast" style="color: ghostwhite"> <b> Top Billed Cast </b> </h3> <table> <tr> <td> <div ng-repeat="cast in cast" class="wrap"> <div ng-if="$index < 9" class="card"> <img ng-src="{{ cast.profile_path }}" alt=""> <div class="card_details"> <h4> <b>{{ cast.name }}</b> </h4> <p>{{ cast.character}}</p> </div> </div> </div> </td> </tr> </table> </div> </div>'),a.put("views/templates/tvShowDetails.html",'<div class="container" id="search"> <form name="valid_select"> <div class="col-md-2"> <div class="form-group"> <select class="form-control" ng-model="selected" required> <option value="">Select Category </option> <option ng-repeat="item in options" value="{{item.value}}">{{item.label}}</option> </select> </div> </div> <div class="col-md-9"> <div class="form-group"> <input type="text" class="form-control" ng-model="searchByTitle" placeholder="search" required> </div> </div> <span> <button class="btn btn-primary" ng-click="search()" ng-disabled="valid_select.$invalid" type="button">Go!</button> </span> </form> </div> <div class="container"> <div class="row"> <div class="backdrop"> <img ng-src="{{details.backdrop_path}}">  </div> <div class="col-md-4"> <a href="#"> <img ng-src="{{details.poster_path}}" height="80%"> </a> </div> <div class="col-md-8" id="img_details"> <h1 style="font-family: \'Source Sans Pro\',Arial, Helvetica, sans-serif; font-size: xx-large ; font-weight: 300px"> {{details.name}} </h1> <h4> <b> Overview </b> </h4> <p> {{details.overview}} </p> <p> <b> Directed By: </b> {{director.name}} </p> <p> <b> Genres: </b> <span ng-repeat="y in details.genres"> {{" "}} {{y.name}} </span> </p> <p> <b> No.Of Seasons: </b> {{details.number_of_seasons}} </p> <p> <b> No.of Episodes: </b> {{details.number_of_episodes}} </p> </div> </div> <div> <h3 class="Cast" style="color: ghostwhite"> <b> Top Billed Cast </b> </h3> <table> <tr> <td> <div ng-repeat="cast in cast" class="wrap"> <div ng-if="$index < 9" class="card"> <img ng-src="{{ cast.profile_path }}" alt=""> <div class="card_details"> <h4> <b>{{ cast.name }}</b> </h4> <p>{{ cast.character}}</p> </div> </div> </div> </td> </tr> </table> </div> </div>')}]);