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
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);
var UserController = require('./user/UserController');
app.use('/api/users', UserController);

app.post('/api/users/upload', function(req, res) {
    console.log(req.files);
    if(req.files === undefined) {
        return res.status(400).send('No files were uploaded.');
    }
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.files;
    
    sampleFile.mv('uploads/'+sampleFile.name, function(err) {
        if (err)
        return res.status(500).send(err);

        res.send('File uploaded!');
    });
  });
module.exports = app;