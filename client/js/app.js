"use strict";

var app = angular.module('app', ['ngRoute', 'ngResource', 'ngStorage', 'app.createTest']);

app.controller("MainCtrl", function ($scope, $rootScope, $location, $localStorage) {
    $scope.$storage = $localStorage;

    $scope.isActive = function (path) {
        return $location.path().match(new RegExp(path, 'g'));
    };

});
