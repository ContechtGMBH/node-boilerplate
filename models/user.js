var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date: {type: Date, default: Date.now}
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
