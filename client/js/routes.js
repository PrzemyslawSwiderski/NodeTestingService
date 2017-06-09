'use strict';

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        controller: 'AuthCtrl',
        templateUrl: 'views/loginForm.html'
    })
        .when('/forgot-pass', {
            controller: 'AuthCtrl',
            templateUrl: 'views/forgottenPasswordForm.html'
        })
        .when('/register', {
            controller: 'AuthCtrl',
            templateUrl: 'views/registerForm.html'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/jobs', {
            controller: 'JobsCtrl',
            templateUrl: 'views/jobs.html'
        })
        .when('/profile', {
            controller: 'AuthCtrl',
            templateUrl: 'views/profile.html'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html'
        })
        .when('/testList', {
            templateUrl: 'views/testList.html',
            controller: 'TestsListCtrl'
        })
        .when('/testEvaluate', {
            templateUrl: 'views/testEvaluate.html',
            controller: 'TestEvaluateCtrl'
        })
        .when('/solveTest', {
            templateUrl: 'views/solveTest.html',
            controller: 'SolveTestCtrl'
        })
        .when('/solveTest/:testId', {
            templateUrl: 'views/solveTestDetails.html',
            controller: 'SolveTestDetailsCtrl'
        })
        .when('/testList/:testId', {
            templateUrl: 'views/testDetails.html',
            controller: 'TestDetailsCtrl'
        })
        .when('/createTest', {
            templateUrl: 'views/createTest.html',
            controller: 'CreateTestCtrl'
        })
        .when('/editors', {
            controller: 'EditorListCtrl',
            templateUrl: 'views/editorList.html'
        })
        .when('/editorPanel', {
            controller: 'EditorPanelController',
            templateUrl: 'views/editorPanel.html'
        })
        .when('/checkTestResults', {
            controller: 'CheckTestResultsController',
            templateUrl: 'views/checkTestResults.html'
        });

});