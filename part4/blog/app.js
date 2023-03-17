const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const logger = require("./utils/logger.js");
const config = require("./utils/config.js");
const middleware = require("./utils/middleware.js");
const morgan = require("./utils/morgan.js");
const loginRouter = require("./controllers/login.js");
mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to mongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
// app.use(morgan.postLogger); not using during  testing
app.use(middleware.tokenExtractor);
app.use("/api/users", usersRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
