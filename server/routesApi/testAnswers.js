"use strict";

var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res) {
    var query = {};
    query.where = req.query;
    query.include = [{model: models.Answer, include: models.Question}, {
        model: models.UserTestResult,
        include: [models.User, models.Test]
    }];
    models.UserAnswer.findAll(query).then(function (result) {
        res.json(result);
    });
});

router.get('/:_id', function (req, res) {
    var _id = req.params._id;
    models.UserAnswer.find({
        where: {id: _id},
        include: [models.Answer, {
            model: models.UserTestResult,
            include: [models.User, models.Test]
        }]
    })
        .then(function (usr) {
            res.json(usr);
        });
});
router.delete('/:_id', function (req, res) {
    var _id = req.params._id;
    models.UserAnswer.destroy({where: {id: _id}})
        .then(function (deleted) {
            if (deleted)
                res.json({message: "successful deleting"});
            else
                res.json({message: "no object to delete"});
        });
});
module.exports = router;