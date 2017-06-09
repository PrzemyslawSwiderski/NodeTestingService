var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res) {
    var query = {};
    query.where = req.query;
    models.User.findAll(query)
        .then(function (usr) {
            if (usr) {
                res.json(usr);
            } else {
                throw new Error('No user with the given identities.');
            }
        }).catch(function (err) {
        res.status(500).json({error: err});
    });
});
router.post('/', function (req, res) {
    models.User.create(req.body).then(function (users) {
        res.json(users.dataValues);
    }).catch(function (error) {
        console.log('ops: ' + error);
        res.status(500).json({error: 'error'});
    });
});
router.put('/:_id', function (req, res) {
    var user = req.body;
    var _id = req.params._id;
    models.User.find({where: {id: _id}})
        .then(function (usr) {
            // Check if record exists in db
            if (usr) {
                usr.updateAttributes(user).then(function () {
                    res.json({
                        message: 'success in update'
                    });
                });
            }
        });
});
router.get('/:_id', function (req, res) {
    var _id = req.params._id;
    models.User.find({where: {id: _id}})
        .then(function (usr) {
            res.json(usr);
        });
});
router.delete('/:_id', function (req, res) {
    var _id = req.params._id;
    models.User.destroy({where: {id: _id}})
        .then(function (deleted) {
            if (deleted)
                res.json({message: "successful deleting"});
            else
                res.json({message: "no object to delete"});
        });
});
module.exports = router;