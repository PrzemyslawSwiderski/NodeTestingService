"use strict";

var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res) {
    var query = {};
    query.where = req.query;
    query.include = [models.UserAnswer, {
        model: models.Test,
        include: [{model: models.Question, include: models.Answer}, models.Job]
    }, models.User];
    models.UserTestResult.findAll(query).then(function (result) {
        res.json(result);
    });
});

router.post('/', function (req, res) {
    models.UserTestResult.create(req.body.testResult).then(function (testResult) {
        req.body.userAnswers.forEach(function (userAnswer) {
            testResult.createUserAnswer(userAnswer);
        });
        return testResult;
    }).then(function (testResult) {
        res.json(testResult.dataValues);
    }).catch(function (error) {
        res.status(500).json({error: 'error'});
    });
});

router.put('/:_id', function (req, res) {
    var userTestResult = req.body;
    var _id = req.params._id;
    models.UserTestResult.find({where: {id: _id}})
        .then(function (usrTR) {
            // Check if record exists in db
            if (usrTR) {
                usrTR.updateAttributes(userTestResult).then(function () {
                    res.json({
                        message: 'success in update'
                    });
                });
            } else {
                throw new Error('Error in updating');
            }
        }).catch(function (error) {
        res.status(500).json({error: 'error'});
    });
});

router.get('/:_id', function (req, res) {
    var _id = req.params._id;
    models.UserTestResult.find({
        where: {id: _id},
        include: [models.UserAnswer, models.Test, models.User]
    }).then(function (usr) {
        res.json(usr);
    });
});
router.delete('/:_id', function (req, res) {
    var _id = req.params._id;
    models.UserTestResult.destroy({where: {id: _id}})
        .then(function (deleted) {
            if (deleted)
                res.json({message: "successful deleting"});
            else
                res.json({message: "no object to delete"});
        });
});
module.exports = router;