import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
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

UserSchema.methods = {

  generateHash (password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  },

  validPassword (password) {

    return bcrypt.compareSync(password, this.password);

  },

}

export default mongoose.model('User', UserSchema);
