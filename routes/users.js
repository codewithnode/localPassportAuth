const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

//User Model
const User = require('../models/user');

router.get("/users/login", (req, res, next) => {
    res.render('login');
});

router.get("/users/register", (req, res, next) => {
    res.render('register');
});

router.post("/users/register", (req, res, next) => {
    let { name, email, password, password2 } = req.body;
    console.log(req.body);
    //Error Handling
    let errors = [];
    if (password.length < 6) {
        errors.push({ msg: "Password is less than six chars" });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords are not matching' });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        //validation passed
        User.findOne({ email: email })
            .then(usr => {
                if (usr) {
                    errors.push({ msg: "User Already exist" });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                }
                else {
                    let newUser = new User({
                        name,
                        email,
                        password
                    })
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(newUser.password, salt, function (err, hash) {
                            console.log(hash)
                            newUser.password = hash;
                            newUser.save().then(msg => {
                                res.render('users/login');

                            })
                        })
                    })

                }
            })


    }

});
module.exports = router;