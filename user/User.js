var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    gender: String,
    dob: Date,
    country: String,
    companyName: String,
    address: String,
    password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');