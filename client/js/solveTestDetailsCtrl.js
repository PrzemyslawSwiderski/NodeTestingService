"use strict";


app.controller('SolveTestDetailsCtrl', function ($scope, $localStorage, $window, $routeParams, notificationFactory, testsFactory, solveTestsFactory) {

    $scope.userAnswers = [];

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

    $scope.saveAnswers = function () {
        $scope.test.Questions.forEach(function (q) {
            q.Answers.forEach(function (a) {
                $scope.userAnswers.push({AnswerId: a.id, givenAnswer: a.givenAnswer === undefined ? 0 : a.givenAnswer})
            })
        });
        $scope.sendSolvedTestToBackend();
    };

    $scope.sendSolvedTestToBackend = function () {
        var saveItem = {
            testResult: {
                TestId: $scope.test.id,
                UserId: $localStorage.loggedUser.id
            },
            userAnswers: $scope.userAnswers
        };
        solveTestsFactory.save(saveItem,
            // success response
            function (createdItem) {
                requestSuccess();
                $window.location.href = '/#/solveTest';
            },
            requestError);
    };

    $scope.goBack = function () {
        $window.location.href = '#/solveTest';
    };

    $scope.getTest();

});