const express = require("express");
const cors = require("cors");
const personsRouter = require("./controllers/persons");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const middleware = require("./utils/middleware");
const config = require("./utils/config");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

const app = express();
app.use(cors());

mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.log("error connecting to MongoDB: ", error.message)
  );

app.use(express.static("build"));
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/", personsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
