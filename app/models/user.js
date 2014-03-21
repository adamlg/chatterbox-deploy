var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
 username: { type: String, required: true, index: { unique: true } },
 password: { type: String, required: true }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
 bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
   if (err) return cb(err);
   cb(null, isMatch);
 });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
