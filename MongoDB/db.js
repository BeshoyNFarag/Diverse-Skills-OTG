const { MongoClient } = require('mongodb');

let dbConnection; // Declare the variable here so it is scoped to this module

module.exports = {
  // Initiates connection to MongoDB and fires the callback function when finished
  connectToDB: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/bookstore')
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.error('Failed to connect to the database', err);
        return cb(err);
      });
  },

  // Returns the active database connection instance to be used in routes
  getDB: () => dbConnection,
};