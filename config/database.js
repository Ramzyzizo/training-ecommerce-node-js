const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((con) => {
      console.log(`connected successfully. ${con.connection.host}`);
    })
    .catch((error) => {
      console.error(`connected Error. ${error}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
