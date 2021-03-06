const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    wallet: {
      type: String,
      unique: true,
      required: true,
    },
    portfolio: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    banner: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', function (next) {
  const user = this;
  const saltRounds = 10;

  if (!user.isModified('password')) return next;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (loginPassword, cb) {
  bcrypt.compare(loginPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
