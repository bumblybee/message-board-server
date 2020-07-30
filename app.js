const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const threadsRouter = require("./routes/threads");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

app.set("view engine", "ejs");

// let whitelist = [
//   "http://127.0.0.1:5500/",
//   "http://localhost:3000",
//   "https://jobless-form.surge.sh",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
