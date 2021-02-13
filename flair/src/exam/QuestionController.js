var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../auth/verifyToken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Questions = require('./Question');

// CREATES A NEW Questions
router.post('/', function(req, res) {
    Questions.create(req.body,
        function(err, Questions) {
            if (err) return res.status(500).send({status:"error", message:err});
            res.status(200).send(Questions);
        });
});

// RETURNS ALL THE QuestionsS IN THE DATABASE
router.get('/', function(req, res) {
    Questions.find({}, function(err, Questions) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the Questionss."});
        res.status(200).send(Questions);
    });
});

// GETS A SINGLE Questions FROM THE DATABASE
router.get('/:id', function(req, res) {
    Questions.findById(req.params.id, function(err, Questions) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the Questions."});
        if (!Questions) return res.status(404).send({status:"error", message:"No Questions found."});
        res.status(200).send(Questions);
    });
});

// DELETES A Questions FROM THE DATABASE
router.delete('/:id', function(req, res) {
    Questions.findByIdAndRemove(req.params.id, function(err, Questions) {
        if (!Questions) return res.status(500).send({status:"error", message:"There was a problem deleting the Questions."});
        if (err) return res.status(500).send({status:"error", message:"There was a problem deleting the Questions."});
        res.status(200).send({status:"error", message:"Questions: " + Questions._id + " was deleted."});
    });
});

// UPDATES A SINGLE Questions IN THE DATABASE
router.put('/:id', function(req, res) {
    Questions.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, Questions) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem updating the Questions."});
        res.status(200).send(Questions);
    });
});


module.exports = router;