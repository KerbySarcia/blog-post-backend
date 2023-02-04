const moongose = require("mongoose");

const dbConn = () => {
  moongose.set("strictQuery", false);
  moongose.connect(process.env.DATABASE_URI);
};

module.exports = dbConn;
