"use strict";

/**
 * Created by PSWIDERSKI on 11.04.2017.
 */


var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res) {
    var query = {};
    query.where = req.query;
    models.Job.findAll(query).then(function (result) {
        res.json(result);
    });
});
router.post('/', function (req, res) {
    models.Job.create(req.body).then(function (jobs) {
        res.json(jobs.dataValues);
    }).catch(function (error) {
        res.status(500).json({error: 'error'});
    });
});
router.put('/:_id', function (req, res) {
    var user = req.body;
    var _id = req.params._id;
    models.Job.find({where: {id: _id}})
        .then(function (usr) {
            // Check if record exists in db
            if (usr) {
                usr.updateAttributes(user).then(function () {
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
    models.Job.find({where: {id: _id}})
        .then(function (usr) {
            res.json(usr);
        });
});
router.delete('/:_id', function (req, res) {
    var _id = req.params._id;
    models.Job.destroy({where: {id: _id}})
        .then(function (deleted) {
            if (deleted)
                res.json({message: "successful deleting"});
            else
                res.json({message: "no object to delete"});
        });
});
module.exports = router;