var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

router.post('/register', function(req, res) {
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
            if (err) return res.status(500).send("There was a problem registering the user.")
                // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
});
router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id, { password: 0 }, // projection
            function(err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");

                res.status(200).send(user);
            });
    });
});

module.exports = router;