const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialUser = new Schema({
    provider: String,
    id: String,
    displayName: String
});

module.exports = mongoose.model('Social', socialUser);