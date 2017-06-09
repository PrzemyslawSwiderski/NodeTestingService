"use strict";

angular.module('app.createTest', ['ngRoute'])

    .controller('CreateTestCtrl', function ($scope, $window, $localStorage, jobsFactory, testsFactory, notificationFactory) {

        $scope.jobs = [];

        $scope.selectedJob = {};

        $scope.questionsList = [];

        $scope.newQuestion =
            {
                question: '',
                questionType: 'CLOSED',
                answers: []
            };

        // PRIVATE FUNCTIONS
        var requestError = function () {
            notificationFactory.error();
        };
        var requestSuccess = function () {
            notificationFactory.success();
        };

        $scope.addQuestionToList = function () {
            if ($scope.newQuestion.questionType === 'OPEN') {
                $scope.newQuestion.answers[0].ifCorrect = true;
            }
            $scope.questionsList.push(angular.copy($scope.newQuestion));
            $scope.resetNewQuestion();
        };


        $scope.resetNewQuestion = function () {
            $scope.newQuestion = {
                question: '',
                questionType: 'CLOSED',
                answers: []
            };
        };

        $scope.removeQuestion = function (question) {
            var index = $scope.questionsList.indexOf(question);
            $scope.questionsList.splice(index, 1);
        };

        $scope.saveTest = function () {
            var saveItem = {
                userId: $localStorage.loggedUser.id,
                jobId: $scope.selectedJob,
                test: {
                    questions: $scope.questionsList
                }
            };
            testsFactory.save(saveItem,
                // success response
                function (createdItem) {
                    console.log(createdItem);
                    requestSuccess();
                },
                requestError);

        };


        // Get all items from the server
        $scope.getAllJobs = function () {
            $scope.jobs = jobsFactory.query(function (success) {
            }, requestError);
        };

        // LOADS ALL ITEMS
        $scope.getAllJobs();

        $scope.goBack = function () {
            $window.location.href = '#/testList/';

            console.log($scope.test);
        };
    });
