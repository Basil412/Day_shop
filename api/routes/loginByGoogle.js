const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Social = require('../models/socialUsers');

let loginGoogle = () => {
    passport.use(new GoogleStrategy({
            clientID: '621724685341-sf7vp7l3sabuqse6ahun1g0m5etpa9mu.apps.googleusercontent.com',
            clientSecret: 'WD6Y6axqXly2mOgaN-6y30_C',
            callbackURL: "http://localhost:3000/users/login/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            let data = profile._json;
            Social.findOne({
                id: data.id
            })
                .exec()
                .then(user => {
                    if (!user) {
                        const newUser = new Social({
                            id: data.id,
                            displayName: data.displayName,
                            provider: data.provider
                        });
                        newUser.save();
                        done(null, newUser);
                    }

                })
                .catch(err => {
                    res.status(500).json(err)
                });
        }
    ))
};

module.exports = loginGoogle;