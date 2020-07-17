const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const threadsRouter = require("./routes/threads");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

let whitelist = "";
if (app.get("env") === "production") {
  whitelist = "https://jobless-form.surge.sh/";
} else {
  whitelist = "http://127.0.0.1:5500";
}

const corsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/threads", threadsRouter);

// error handlers
app.use(errorHandlers.notFound);

if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
