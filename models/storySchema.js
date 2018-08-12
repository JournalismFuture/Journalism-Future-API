"use strict";
//import dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var StorySchema = new Schema({
  position: { type: Number },
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  headline: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: Date,
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
});
//export our module to use in server.js
module.exports = mongoose.model("Story", StorySchema);
