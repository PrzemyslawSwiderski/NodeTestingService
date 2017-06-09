"use strict";

app.factory('usersFactory', function ($resource) {

    var actions = {
        // add update to actions (is not defined by default)
        'update': {method: 'PUT'}
    };

    return $resource('/api/users/:userId', {userId: '@id'}, actions);
});