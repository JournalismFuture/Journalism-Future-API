"use strict";
//import dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var ArticleSchema = new Schema({
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  headline: {
    type: String,
    required: true
  },
  subline: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  timestamp: Date,
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  views: {
    type: Number,
    default: 0
  },
  tag: [String],
  story: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      default: []
    }
  ],
  polylines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Polyline",
      default: []
    }
  ]
});
//export our module to use in server.js
module.exports = mongoose.model("Article", ArticleSchema);
