"use strict";


app.controller('SolveTestCtrl', function ($scope,$window, testsFactory, notificationFactory) {
    // PRIVATE FUNCTIONS
    var requestSuccess = function () {
        notificationFactory.success();
    };

    var requestError = function () {
        notificationFactory.error();
    };

    // all the items
    $scope.tests = [];

    // indicates if the view is being loaded
    $scope.loading = false;

    // Deletes an item
    $scope.showDetails = function (test) {
        $window.location.href = '#/solveTest/' + test.id;
    };

    // Get all items from the server
    $scope.getAllItems = function () {
        $scope.loading = true;
        $scope.tests = testsFactory.query(function (success) {
            $scope.loading = false;
        }, requestError);
    };

    // LOADS ALL ITEMS
    $scope.getAllItems();
});