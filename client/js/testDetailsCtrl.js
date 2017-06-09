"use strict";


app.controller('TestDetailsCtrl', function ($scope,$window, $routeParams, testsFactory, notificationFactory) {
    var requestSuccess = function () {
        notificationFactory.success();
    };

    var requestError = function () {
        notificationFactory.error();
    };

    $scope.getTest = function () {
        $scope.test = testsFactory.get({testId: $routeParams.testId}, function (success) {
            $scope.loading = false;
        }, requestError);
    };

    $scope.goBack = function () {
        $window.location.href = '#/testList/';
    };

    $scope.getTest();

    $scope.saveTestPDF= function () {
        generateTestAsPDF($scope.test);
    };

    $scope.saveTestEXCEL= function () {
        generateTestAsXlsx($scope.test);
    };


});