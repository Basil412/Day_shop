const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('google');
    console.log('req.user', req.scope);
};
