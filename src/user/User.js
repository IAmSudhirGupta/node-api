var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: false },
    dob: { type: Date, required: false },
    country: { type: String, required: false },
    companyName: { type: String, required: false },
    address: { type: String, required: false },
    password: { type: String, required: false }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');