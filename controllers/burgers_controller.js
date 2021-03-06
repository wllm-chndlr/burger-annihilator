var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

// Create routes and set up logic within those routes where required

router.post("/", function(request, response) {
  burger.create([
    "burger_name", "devoured"
  ], [
    request.body.burger_name, request.body.devoured
  ], function(result) {
    // Send back the ID of the new burger
    response.json({ id: result.insertId });
  });
});

router.put("/:id", function(request, response) {
  var condition = "id = " + request.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: request.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return response.status(404).end();
    } else {
      response.status(200).end();
    }
  });
});

router.delete("/:id", function(request, response) {
  var condition = "id = " + request.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return response.status(404).end();
    } else {
      response.status(200).end();
    }
  });
});

// Export routes for server.js to use
module.exports = router;