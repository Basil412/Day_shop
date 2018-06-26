const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/users');

let loginFacebook = () => {
    passport.use(new FacebookStrategy({
            clientID: 462999394128434,
            clientSecret: '332817132f505a9481a237de5e456fd5',
            callbackURL: "http://localhost:3000/users/login/facebook/callback"
        },
        function(req, accessToken, refreshToken, profile, done) {
            console.log('check profile', profile);
            let data = profile._json();
            User.findOne({email: req.body.email})
                .exec() // псевдопромис превращает в промис - нужно гуглить
                .then(user => {
                    if (!user) {
                        const user = new User({
                            email: data.email
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        }
    ))
};

module.exports = loginFacebook;