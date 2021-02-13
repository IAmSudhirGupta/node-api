var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSet = new Schema({
    questionPaperRules: { type: String, required: true },
    questionPaperTime: { type: Number, required: true },
    startDateTime: {type : Date, required: false},
    endDateTime: {type : Date, required: false},
    totalMarks: {type : Number, required: true},
    totalNumberOfQuestion: {type : Number, required: true},
    typeOfQuestionPaper: {type : String, required: true},
    questionPaperDescription: {type : String, required: true},
    questionPaperName: {type : String, required: true},
    answerQuestions: { type: Array}
});

mongoose.model('QuestionSet', QuestionSet);
module.exports = mongoose.model('QuestionSet');