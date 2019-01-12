var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
var verifyToken = require('./verifyToken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

router.post('/register', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (user) return res.status(400).send({status:"error", message:"This email is already exist."});

        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
                password: hashedPassword,
                userName: req.body.userName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                gender: req.body.gender,
                dob: req.body.dob,
                country: req.body.country,
                companyName: req.body.companyName,
                address: req.body.address
            },
            function(err, user) {
                console.log(err);
                if (err) return res.status(500).send({status:"error", message:"There was a problem registering the user."});
                    // create a token
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token });
            });
    });
});
router.get('/me', verifyToken, function(req, res, next) {
    User.findById(req.userId, { password: 0 }, function(err, user) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the user."});
        if (!user) return res.status(404).send({status:"error", message:"No user found."});
        res.status(200).send(user);
    });
});
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return res.status(500).send({status:"error", message:'Error on the server.'});
        if (!user) return res.status(404).send({status:"error", message:'No user found.'});
        if(!req.body.password) return res.status(400).send({status:"error", message:'password empty.'});
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        delete user.password;
        res.status(200).send({ auth: true, token: token, data:user });
    });
});
router.post('/reset-password', verifyToken,function(req, res) {
    User.findById(req.body.id, function(err, user) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the user."});
        if (!user) return res.status(404).send({status:"error", message:"No user found."});

        if(req.body.oldPassword === req.body.newPassword) return res.status(400).send({status:"error", message:"new password and old password are same."})

        var passwordIsValid = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (!passwordIsValid) return res.status(400).send({status:"error", message:"Old password is wrong."});

        var hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
        user.password = hashedPassword;
        user.save(function (err, user) {
            if (err) return res.status(500).send({status:"error", message:"There was a problem updating the password."});
            res.status(200).send({ status: "success", message: "password changed successfully." });
        });
    });
});
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.post('/sendotp', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {

        if (err) return res.status(500).send({status:"error", message:'Error on the server.'});
        if (!user) return res.status(404).send({status:"error", message:'No user found.'});

        //create otp and trigger to email;
        delete user.password;
        res.status(200).send(user);
    });
});

router.post('/verifyotp/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the user."});
        if (!user) return res.status(404).send({status:"error", message:"No user found."});
        
        if(!req.body.otp) {
            return res.status(400).send({status:"error", message:"OTP now found."});
        }

        let otp = req.body.otp;

        res.status(200).send({
            status:"success", "message": "OTP verified successfully"
        });
    });
});

router.post('/setpassword/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(500).send({status:"error", message:"There was a problem finding the user."});
        if (!user) return res.status(404).send({status:"error", message:"No user found."});

        if (!req.body.newPassword) return res.status(400).send({status:"error", message:"Password is not provided."});

        var hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
        user.password = hashedPassword;
        user.save(function (err, user) {
            if (err) return res.status(500).send({status:"error", message:"There was a problem updating the password."});
            res.status(200).send({ status: "success", message: "password changed successfully." });
        });
    });
});

//middleware function
router.use(function(user, req, res, next) {
    res.status(200).send(user);
});

module.exports = router;