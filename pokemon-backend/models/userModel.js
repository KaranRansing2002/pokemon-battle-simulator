const mongoose = require("mongoose");
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto');

const dblink =
  "mongodb+srv://Strange007:CGPcJe8SeHIFj9jI@cluster0.elmuzpg.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dblink)
  .then(() => {
    console.log("user DB connected.");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique : true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
        minLength : 8
    },
    confirmPassword: {
        type: String,
        required: false,
        minLength: 8,
        validate: function () {
            return this.confirmPassword===this.password
        }
    },
    teams : {
        type: Array,
    } 
}) 

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})


const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel