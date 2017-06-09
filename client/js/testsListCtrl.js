"use strict";

/**
 * Created by PSWIDERSKI on 12.04.2017.
 */



app.controller('TestsListCtrl', function ($scope,$window, testsFactory, notificationFactory) {
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
    $scope.deleteItem = function (item) {
        testsFactory.delete({id: item.id}, item, function (success) {
            requestSuccess();
            // Remove from scope
            var index = $scope.tests.indexOf(item);
            $scope.tests.splice(index, 1);
        }, requestError);
    };

    // Deletes an item
    $scope.showDetails = function (test) {
        $window.location.href = '#/testList/' + test.id;
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