"use strict";

var mongoose = require("mongoose");

var emailValidator = require('email-validator');

var bcrypt = require('bcrypt');

var crypto = require('crypto');

var dblink = "mongodb+srv://Strange007:CGPcJe8SeHIFj9jI@cluster0.elmuzpg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dblink).then(function () {
  console.log("user DB connected.");
})["catch"](function (err) {
  console.log("Error", err);
});
var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function validate() {
      return emailValidator.validate(this.email);
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  confirmPassword: {
    type: String,
    required: false,
    minLength: 8,
    validate: function validate() {
      return this.confirmPassword === this.password;
    }
  },
  teams: {
    type: Array
  }
});
userSchema.pre('save', function () {
  this.confirmPassword = undefined;
});
var userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;