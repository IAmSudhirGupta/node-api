var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../auth/verifyToken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Candidates = require('./Candidate');
var Questions = require('./Question');
var QuestionSet = require('./QuestionSet');

// CREATES A NEW Candidates
router.post('/', function(req, res) {
    let rq = randomQustions();
    rq.then(function(questionSet){
        req.body.questionSetId = questionSet._id;
        Candidates.create(req.body,
            function(err, candidate) {
                if (err) return res.status(500).send({status:"error", message:err});
                var candidateQuestions = cloneObject(questionSet);
                candidateQuestions.userId = candidate._id;
                candidateQuestions.answerQuestionPaperId = questionSet._id;
                candidateQuestions.questionPaperId = questionSet._id;
                res.status(200).send(candidateQuestions);
            });
    });
});
function cloneObject(src) {
    return JSON.parse(JSON.stringify(src));
}
let randomQustions = async () => {
    let questionSet ={};
    let count = await QuestionSet.count().exec(); 
    var random = Math.floor(Math.random() * count);
    questionSet = await QuestionSet.findOne().skip(random).exec();
    let questions = await Questions.find({questionSetId: questionSet._id});
    questionSet.answerQuestions = questions;
    return  questionSet;
}
// RETURNS ALL THE Candidates IN THE DATABASE
router.get('/', function(req, res) {
    Candidates.find({}, function(err, Candidates) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the Candidates."});
        res.status(200).send(Candidates);
    });
});

// GETS A SINGLE Candidates FROM THE DATABASE
router.get('/:id', function(req, res) {
    Candidates.findById(req.params.id, function(err, Candidates) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the Candidates."});
        if (!Candidates) return res.status(404).send({status:"error", message:"No Candidates found."});
        res.status(200).send(Candidates);
    });
});

// DELETES A Candidates FROM THE DATABASE
router.delete('/:id', function(req, res) {
    Candidates.findByIdAndRemove(req.params.id, function(err, Candidates) {
        if (!Candidates) return res.status(500).send({status:"error", message:"There was a problem deleting the Candidates."});
        if (err) return res.status(500).send({status:"error", message:"There was a problem deleting the Candidates."});
        res.status(200).send({status:"error", message:"Candidates: " + Candidates._id + " was deleted."});
    });
});

// UPDATES A SINGLE Candidates IN THE DATABASE
router.put('/:id', function(req, res) {
    Candidates.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, Candidates) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem updating the Candidates."});
        res.status(200).send(Candidates);
    });
});


module.exports = router;