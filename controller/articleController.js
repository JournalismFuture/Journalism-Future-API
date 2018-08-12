var Article = require("../models/articleSchema.js");
var Story = require("../models/storySchema.js");
var Polyline = require("../models/polylineSchema.js");
var User = require("../models/userSchema.js");

exports.getAll = function(req, res) {
  Article.find()
    .populate("author")
    .populate({
      path: "story",
      populate: { path: "author" }
    })
    .populate("polylines")
    .exec(function(err, list) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(list);
    });
};

exports.create = function(req, res, next) {
  if (
    req.body.subline &&
    req.body.headline &&
    req.body.authorID &&
    req.body.latitude &&
    req.body.category &&
    req.body.longitude
  ) {
    var article = {
      author: req.body.authorID,
      headline: req.body.headline,
      subline: req.body.headline,
      timestamp: req.body.timestamp,
      category: req.body.category,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      story: [],
      polylines: []
    };

    if (req.body.story != []) {
      req.body.story.forEach(story => {
        var story = {
          position: story.position,
          timestamp: new Date(),
          headline: story.headline,
          content: story.content,
          latitude: story.latitude,
          longitude: story.longitude,
          author: story.authorID
        };
        var something = new Story(story);
        something.save(function(err) {
          if (err) return next(err);
        });

        article.story.push(something._id);
      });
    }

    if (req.body.polylines != []) {
      req.body.polylines.forEach(polyline => {
        var polylineData = {
          position: polyline.position,
          coordinates: polyline.coordinates
        };

        var polyline = new Polyline(polylineData);
        polyline.save(function(err, polyline2) {
          if (err) return next(err);
        });

        article.polylines.push(polyline._id);
      });
    }
    console.log("FINAL", article);

    Article.create(article, function(error) {
      if (error) {
        console.log(error);

        return next(error);
      } else {
        console.log("success", article);
        return res.send(article);
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
};
