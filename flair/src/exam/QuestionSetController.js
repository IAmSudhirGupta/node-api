var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../auth/verifyToken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var QuestionSet = require('./QuestionSet');
var Questions = require('./Question');
// CREATES A NEW QuestionSet
router.post('/', function(req, res) {
    QuestionSet.create(req.body,
        function(err, QuestionSet) {
            if (err) return res.status(500).send({status:"error", message:err});
            res.status(200).send(QuestionSet);
        });
});

// RETURNS ALL THE QuestionSetS IN THE DATABASE
router.get('/', function(req, res) {
    QuestionSet.find({}, function(err, QuestionSets) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the QuestionSets."});
        res.status(200).send(QuestionSets);
    });
});

// GETS A SINGLE QuestionSet FROM THE DATABASE
router.get('/:id', function(req, res) {
    QuestionSet.findById(req.params.id, function(err, QuestionSets) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the QuestionSet."});
        if (!QuestionSets) return res.status(404).send({status:"error", message:"No QuestionSet found."});
        Questions.find({questionSetId: req.params.id}, function(err, qs) {
            if (err) return res.status(500).send({status:"error", message:"There was a problem finding the QuestionSets."});
            QuestionSets['answerQuestions'] = qs;
            res.status(200).send(QuestionSets);
        });
    });
});

// DELETES A QuestionSet FROM THE DATABASE
router.delete('/:id', function(req, res) {
    QuestionSet.findByIdAndRemove(req.params.id, function(err, QuestionSet) {
        if (!QuestionSet) return res.status(500).send({status:"error", message:"There was a problem deleting the QuestionSet."});
        if (err) return res.status(500).send({status:"error", message:"There was a problem deleting the QuestionSet."});
        res.status(200).send({status:"error", message:"QuestionSet: " + QuestionSet._id + " was deleted."});
    });
});

// UPDATES A SINGLE QuestionSet IN THE DATABASE
router.put('/:id', function(req, res) {
    QuestionSet.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, QuestionSet) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem updating the QuestionSet."});
        res.status(200).send(QuestionSet);
    });
});


module.exports = router;