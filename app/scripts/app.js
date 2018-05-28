'use strict';

/**
 * @ngdoc overview
 * @name movieSearchApp
 * @description
 * # movieSearchApp
 *
 * Main module of the application.
 */
var app= angular.module('movieSearchApp', ['ui.router', 'angularUtils.directives.dirPagination']); 

$(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 100) {
        $("#header_nav").addClass("small")
    } else {
        $("#header_nav").removeClass("small")
    }
  
  });
 