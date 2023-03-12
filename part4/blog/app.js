const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/blogs.js");
const logger = require("./utils/logger.js");
const blogsRouter = require("./controllers/blogs.js");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted address" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(unknownEndpoint);
app.use(errorHandler);
module.exports = app;
