/**
 * Created by Administrator on 3/26/2016.
 */

var mongoose = require('mongoose');

/**
 * Create user schema
 */
var userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: { type: String, unique: true, lowercase: true },
    languages: [String]
});

/**
 * Create user model
 */
var User = mongoose.model('User', userSchema);

module.exports = User;