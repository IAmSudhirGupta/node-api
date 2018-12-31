require('dotenv').config();
var express = require('express');
var app = express();
var db = require('./db');
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
var AuthController = require('./src/auth/AuthController');
app.use('/api/auth', AuthController);
var UserController = require('./src/user/UserController');
app.use('/api/users', UserController);
var UploadController =  require('./src/UploadController');
app.use('/api/upload', UploadController);

module.exports = app;