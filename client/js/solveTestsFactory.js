"use strict";

app.factory('solveTestsFactory', function ($resource) {

    var actions = {
        // add update to actions (is not defined by default)
        'update': {method: 'PUT'}
    };

    return $resource('/api/solveTest/:solveTest', {solveTest: '@id'}, actions);
});