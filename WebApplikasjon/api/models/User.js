//Selve userSchema'et er skrevet og utformet av Pedram Nourian - kandidatnr: 6020
//Begge funksjonene under er hentet (ren kopi med 1 endring: importerer bcrpyjs og ikke bcrypt) fra mongodb-artikkel
//Kilde: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  userName: {
    type: String, required: true, index: { unique: true }
  },
  password: {
    type: String, required: true
  }
})

// Koden som føgler er hentet rett fra mongoddbAtlas, modifiseringer er gjort på formatering av koden og import av bcrypjs istedenfor bcrypt,

//Kilde: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password'))
    return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err)
      return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err)
        return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err)
      return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
