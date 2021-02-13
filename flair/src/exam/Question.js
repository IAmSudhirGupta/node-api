var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Questions = new Schema({
        answerQuestionId: { type: Schema.Types.ObjectId , auto: true},
        questionSetId : {type: Schema.Types.ObjectId, ref: 'QuestionSet', required: true},
        questionText: { type: String, required: true },
        questionType: { type: String, required: true },
        correctMarks: { type: Number, required: true },
        negativeMarks: { type: Number, required: true },
        isSaved: { type: Boolean, required: true },
        isRequired: { type: Boolean, required: true },
        options: { type : Array , "default" : [] },
        answer: {type: String, required: false}
});
mongoose.model('Questions', Questions);

module.exports = mongoose.model('Questions');
