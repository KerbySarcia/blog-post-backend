require("dotenv").config();
require("express-async-errors");

const express = require("express");
const moongose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const corsOptions = require("./config/corsOptions");
const DBConnection = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

DBConnection();

//Custom Middleware
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(logger);

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/", require("./router/indexRoutes"));

// 404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else res.type("text").send("404 not found");
});

app.use(errorHandler);

moongose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
