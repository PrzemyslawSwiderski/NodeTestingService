"use strict";

var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/', function (req, res) {
    var query = {};
    query.where = req.query;
    query.include = [models.User, models.Job, {
        model: models.Question,
        include: [models.Answer]
    }];
    models.Test.findAll(query).then(function (result) {
        res.json(result);
    });
});

router.post('/', function (req, res) {
    models.User.find({
        where: {
            id: req.body.userId
        }
    }).then(function (user) {
        user.createEditTest(req.body.test).then(function (test) {
            req.body.test.questions.forEach(function (currentQuestion) {
                test.createQuestion(currentQuestion).then(function (createdQuestion) {
                    currentQuestion.answers.forEach(function (currentAnswer) {
                        createdQuestion.createAnswer(currentAnswer).then(function (createdAnswer) {
                            console.log('Created answer: ', createdAnswer);
                        });
                    });
                })
            });
            return test;
        }).then(function (test) {
            test.setJob(req.body.jobId);
        }).then(function () {
            res.json({message: "successful created test"});
        }).catch(function (error) {
            console.log('ops: ' + error);
            res.status(500).json({error: 'error'});
        });
    });
});
router.get('/:_id', function (req, res) {
    var _id = req.params._id;
    models.Test.find({
        where: {id: _id}, include: [models.User, models.Job, {
            model: models.Question,
            include: [models.Answer]
        }]
    })
        .then(function (usr) {
            res.json(usr);
        });
});

router.delete('/:_id', function (req, res) {
    var _id = req.params._id;
    models.Test.destroy({where: {id: _id}})
        .then(function (deleted) {
            if (deleted)
                res.json({message: "successful deleting"});
            else
                res.json({message: "no object to delete"});
        });
});

router.put('/:_id', function (req, res) {
    var testToUpdate = req.body;
    var _id = req.params._id;
    models.Test.find({where: {id: _id}})
        .then(function (test) {
            // Check if record exists in db
            if (test) {
                test.updateAttributes(testToUpdate).then(function () {
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


module.exports = router;