"use strict";

app.controller('AuthCtrl', function ($scope, $rootScope, $window, $localStorage, usersFactory) {

    $scope.hasError = false;
    $scope.loginUser = function () {
        var query = {
            login: $scope.login ? $scope.login : "null",
            password: $scope.password ? $scope.password : "null"
        };
        usersFactory.query(query
            , function (response) {
            if(response[0])
            {
                console.log('Successful login!! as ', response[0]);
                $localStorage.loggedUser = response[0];
                $window.location.href = $localStorage.loggedUser.adminRights ? '#/profile' : '#/about';
            }
            else
            {
                console.log('Ops: ', response);
                $scope.hasError = true;
            }
        }, function (response) {
            console.log('Ops: ', response);
            $scope.hasError = true;
        });
    };

    $scope.registerUser = function () {
        usersFactory.save({
            login: $scope.login,
            name: $scope.name,
            surname: $scope.surname,
            email: $scope.email,
            password: $scope.password
        }, function (response) {
            alert('Successful register!!');
            console.log('Successful register!! as ', response);
            $window.location.href = '#/';
        }, function (response) {
            alert('Something went wrong... Please try again!');
            console.log('Ops: ' + response);
        });
    };
    $rootScope.logOut = function () {
        $window.location.href = '#/';
        delete $localStorage.loggedUser;
    };
});
