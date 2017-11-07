// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {

  showAll: function(callback) {
    orm.showAll("burgers", function(result) {
      callback(result);
    });
  },
  
  // The variables cols and vals are arrays.
  create: function(columns, values, callback) {
    orm.create("burgers", columns, values, function(result) {
      callback(result);
    });
  },
  
  update: function(objColVals, condition, callback) {
    orm.update("burgers", objColVals, condition, function(result) {
      callback(result);
    });
  },
  
  delete: function(condition, callback) {
    orm.delete("burgers", condition, function(result) {
      callback(result);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
