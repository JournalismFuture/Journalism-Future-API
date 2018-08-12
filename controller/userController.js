var User = require("../models/userSchema.js");

exports.getAll = function(req, res) {
  User.find(function(err, data) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        header: "Admin Error",
        message: "Could not find any User. Make sure some user exist."
      });
    } else {
      res.json(data);
    }
  });
};

exports.create = function(req, res, next) {
  console.log(req.body);

  if (
    req.body.email &&
    req.body.fullname &&
    req.body.firstname &&
    req.body.lastname &&
    req.body.middlename &&
    req.body.birthdate &&
    req.body.imagePath
  ) {
    var userData = {
      email: req.body.email,
      fullname: req.body.fullname,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      middlename: req.body.middlename,
      birthdate: req.body.birthdate,
      imagePath: req.body.imagePath
    };
    console.log(userData);

    User.create(userData, function(error, user) {
      console.log(user);
      if (error) {
        return next(error);
      } else {
        res.send(user);
      }
    });
  } else {
    return res.status(400).json({
      header: "Credential Error",
      message: "All fields are required to create an account."
    });
  }
};
