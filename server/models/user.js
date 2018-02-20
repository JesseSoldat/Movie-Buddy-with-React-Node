const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pick = require('lodash').pick;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  const access = "auth";
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'mysupercoolsecret').toString();
  user.tokens = [];
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.pre('save', function(next) {
  let user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        // console.log('pre save hash', user);        
        next();
      });
    });
  } else { next(); }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};