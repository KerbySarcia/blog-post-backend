const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMM\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  // Check the log dir if exist
  if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
    // create a log dir
    await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
  }

  // Append log item
  await fsPromise.appendFile(
    path.join(__dirname, "..", "logs", logFileName),
    logItem
  );
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  next();
};

module.exports = { logger, logEvents };
