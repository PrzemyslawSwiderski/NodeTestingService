"use strict";


app.controller('TestEvaluateCtrl', function ($scope, $localStorage, $window, $routeParams, solveTestsFactory, testsAnswersFactory, notificationFactory) {
    // PRIVATE FUNCTIONS
    var requestSuccess = function () {
        notificationFactory.success();
    };

    var requestError = function () {
        notificationFactory.error();
    };

    // all the items
    $scope.testsResults = [];

    $scope.testAnswers = [];

    // indicates if the view is being loaded
    $scope.loading = false;

    // Deletes an item
    $scope.deleteItem = function (item) {
        solveTestsFactory.delete({id: item.id}, item, function (success) {
            requestSuccess();
            // Remove from scope
            var index = $scope.testsResults.indexOf(item);
            $scope.testsResults.splice(index, 1);
        }, requestError);
    };

    // Get all items from the server
    $scope.getAllItems = function () {
        $scope.loading = true;
        $scope.testsResults = solveTestsFactory.query(function (success) {
            $scope.loading = false;
        }, requestError);
    };

    $scope.sendMail = function (test) {
        $scope.loading = true;
        // sendMail implementation
    };

    // Get all items from the server
    $scope.evaluate = function (testResult) {
        $scope.loading = true;
        $scope.testAnswers = testsAnswersFactory.query({UserTestResultId: testResult.id}, function (success) {
            $scope.loading = false;

            var correctAnswersCounter = 0;
            var allAnswersCounter = 0;
            var stringsAreEqualIgnoreCase = function (string1, string2) {
                return string1.toUpperCase() === string2.toUpperCase();
            };

            var evaluateTestForOpenQuestion = function (testAnswer) {
                if (stringsAreEqualIgnoreCase(testAnswer.givenAnswer, testAnswer.Answer.answer))
                    correctAnswersCounter++;
            };

            var evaluateTestForClosedQuestion = function (testAnswer) {
                if (!testAnswer.Answer.ifCorrect && testAnswer.givenAnswer === "0")
                    correctAnswersCounter++;
                if (testAnswer.Answer.ifCorrect && testAnswer.givenAnswer === "1")
                    correctAnswersCounter++;
            };

            $scope.testAnswers.forEach(function (testAnswer) {
                testAnswer.Answer.Question.questionType === 'CLOSED' ? evaluateTestForClosedQuestion(testAnswer) : evaluateTestForOpenQuestion(testAnswer);
                allAnswersCounter++;
            });
            testResult.result = correctAnswersCounter / allAnswersCounter * 100.0;
            solveTestsFactory.update(testResult);
        }, requestError);
    };

    // LOADS ALL ITEMS
    $scope.getAllItems();
});