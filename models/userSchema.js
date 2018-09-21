"use strict";
//import dependency
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  imagePath: String,
  permission: {
    type: Number,
    default: 0
  },
  type: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", UserSchema);
