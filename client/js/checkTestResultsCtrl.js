"use strict";


app.controller('CheckTestResultsController', function ($localStorage, $scope, solveTestsFactory, notificationFactory) {
    // PRIVATE FUNCTIONS
    var requestSuccess = function () {
        notificationFactory.success();
    };

    var requestError = function () {
        notificationFactory.error();
    };

    // all the items
    $scope.testsResults = [];

    // indicates if the view is being loaded
    $scope.loading = false;

    // Get all items from the server
    $scope.getAllItems = function () {
        $scope.loading = true;
        $scope.testsResults = solveTestsFactory.query({UserId: $localStorage.loggedUser.id}, function (success) {
            $scope.loading = false;
        }, requestError);
    };

    // LOADS ALL ITEMS
    $scope.getAllItems();
});