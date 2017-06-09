"use strict";

/**
 * Created by Mateusz Małek & Justyna Rodak on 24.05.17.
 */

app.controller('EditorListCtrl', function ($scope, $window, $filter, usersFactory, notificationFactory, $localStorage)
{
    var requestSuccess = function () {
        notificationFactory.success();
    };

    var requestError = function () {
        notificationFactory.error();
    };

    $scope.editors = [];
    $scope.notEditors = [];
    $scope.loading = false;

    $scope.deletePermissions = function(item) {
        item.editorRights = 0;
        usersFactory.update({ id: item.id }, item, function (success)
        {
            requestSuccess();

            $scope.getEditors();

        }, requestError);
    };

    $scope.addPermissions = function () {
        var id = $scope.selectedEditor;
        var item = $filter('filter')($scope.notEditors, function (d) {return d.id == id;})[0];

        item.editorRights = 1;
        usersFactory.update({ id: item.id }, item, function (success) {
            requestSuccess();

            $scope.getEditors();

        }, requestError);
    };

    $scope.getEditors = function() {
       $scope.loading = true;

       $scope.editors = usersFactory.query({ editorRights: 1 }, function (success) {
           $scope.loading = false;
       }, requestError);
    };

    $scope.getNoEditors = function() {
        $scope.loading = true;

        $scope.notEditors = usersFactory.query({ editorRights: 0 }, function (success) {
            $scope.loading = false;
        }, requestError);
    };

    $scope.getEditors();
    $scope.getNoEditors();
});