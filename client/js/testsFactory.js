"use strict";

/**
 * Created by PSWIDERSKI on 11.04.2017.
 */


app.factory('testsFactory', function ($resource) {

    var actions = {
        // add update to actions (is not defined by default)
        'update': {method: 'PUT'}
    };

    return $resource('/api/tests/:testId', {testId: '@id'}, actions);
});