module.exports = function(router) {
  // const auth = require("../auth.js");
  var article = require("../controller/articleController.js");

  // Create a new Note
  router.post("/article/create", article.create);

  // Retrieve all article
  router.get("/article/getAll", article.getAll);
};
