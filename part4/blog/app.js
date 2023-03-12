const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/blogs.js");
const logger = require("./utils/logger.js");

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      if (blogs) {
        logger.info("blogs fetched successfully!");
        response.json(blogs);
      }
    })
    .catch((error) => next(error));
});

app.post("/api/blogs", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      logger.info("blog saved successfully!");

      response.status(201).json(result);
    })
    .catch((error) => next(error));
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted address" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
module.exports = app;
