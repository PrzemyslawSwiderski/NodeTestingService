"use strict";

/**
 * Created by PSWIDERSKI on 12.04.2017.
 */



app.controller('EditorPanelController', function ($scope, $window, testsFactory, $localStorage, notificationFactory) {
    // PRIVATE FUNCTIONS
    var requestSuccess = function () {
        notificationFactory.success();
    };

    var requestError = function () {
        notificationFactory.error();
    };

    $scope.tests = [];

    // indicates if the view is being loaded
    $scope.loading = false;
    $scope.editedAnyTest = false;

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
    $scope.getAllEditorTests = function () {
        $scope.loading = true;

        $scope.tests = testsFactory.query({EditorId: $localStorage.loggedUser.id});
    };

    $scope.updateTestPublic = function (test) {
        test.public = !test.public;
        testsFactory.update(test);
    };

    $scope.displayTestPublic = function (index) {
        switch (index) {
            case true:
                return 'Publiczny';
                break;

            case false:
                return 'Prywatny';
                break;
        }
        return;
    };

    // LOADS ALL ITEMS
    $scope.getAllEditorTests();
});