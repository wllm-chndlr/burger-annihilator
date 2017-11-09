// Import MySQL connection
var connection = require("../config/connection.js");

// Helper function for SQL syntax
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // Loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // If string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  // Translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
  
  showAll: function(table, callback) {
    var queryString = "SELECT * FROM " + table + ";";
    
    console.log(queryString);
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      callback(result);
    });
  },
  
  create: function(table, columns, values, callback) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += columns.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(values.length);
    queryString += ") ";

    console.log(queryString);
    connection.query(queryString, values, function(error, result) {
      if (error) {
        throw error;
      }

      callback(result);
    });
  },

  update: function(table, objColVals, condition, callback) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }

      callback(result);
    });
  },

  delete: function(table, condition, callback) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }

      callback(result);
    });
  }

};

// Export the orm object for the model (burger.js)
module.exports = orm;