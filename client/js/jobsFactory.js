"use strict";

/**
 * Created by PSWIDERSKI on 11.04.2017.
 */


app.factory('jobsFactory', function ($resource) {

    var actions = {
        // add update to actions (is not defined by default)
        'update': {method: 'PUT'}
    };

    return $resource('/api/jobs/:jobId', {jobId: '@id'}, actions);
});