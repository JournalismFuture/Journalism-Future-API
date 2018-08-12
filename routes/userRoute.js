module.exports = function(router) {
  // const auth = require("../auth.js");
  var user = require("../controller/userController.js");

  // Create a new Note
  router.post("/user/create", user.create);

  // Retrieve all article
  router.get("/user/getAll", user.getAll);
};
