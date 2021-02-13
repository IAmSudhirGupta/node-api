var mongoose = require('mongoose');
let Schema =  mongoose.Schema;
var Candidates = new Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    college: { type: String, required: false },
    gender: { type: String, required: false },
    dob: { type: Date, required: false },
    country: { type: String, required: false },
    companyName: { type: String, required: false },
    address: { type: String, required: false },
    questionSetId: {type: Schema.Types.ObjectId, ref: 'QuestionSet'}
});

mongoose.model('Candidates', Candidates);

module.exports = mongoose.model('Candidates');