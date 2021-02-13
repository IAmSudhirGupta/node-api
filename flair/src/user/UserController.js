var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../auth/verifyToken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/', function(req, res) {
    User.create({
            password: req.body.password,
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            gender: req.body.gender,
            dob: req.body.dob,
            country: req.body.country,
            companyName: req.body.companyName,
            address: req.body.address
        },
        function(err, user) {
            if (err) return res.status(500).send({status:"error", message:"There was a problem adding the information to the database."});
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', verifyToken, function(req, res) {
    User.find({}, function(err, users) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the users."});
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the user."});
        if (!user) return res.status(404).send({status:"error", message:"No user found."});
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (!user) return res.status(500).send({status:"error", message:"There was a problem deleting the user."});
        if (err) return res.status(500).send({status:"error", message:"There was a problem deleting the user."});
        res.status(200).send({status:"error", message:"User: " + user._id + " was deleted."});
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, user) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem updating the user."});
        res.status(200).send(user);
    });
});


module.exports = router;