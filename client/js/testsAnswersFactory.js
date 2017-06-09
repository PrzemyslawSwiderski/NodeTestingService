"use strict";

/**
 * Created by PSWIDERSKI on 11.04.2017.
 */


app.factory('testsAnswersFactory', function ($resource) {

    var actions = {
        // add update to actions (is not defined by default)
        'update': {method: 'PUT'}
    };

    return $resource('/api/testAnswers/:testAnswerId', {testAnswerId: '@id'}, actions);
});