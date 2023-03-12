const logger = require("../utils/logger.js");
const Blog = require("../models/blogs.js");

const blogsRouter = require("express").Router();
blogsRouter.get("/", (request, response, next) => {
  console.log("inside get");
  Blog.find({})
    .then((blogs) => {
      if (blogs) {
        logger.info("blogs fetched successfully!");
        response.json(blogs);
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});
module.exports = blogsRouter;
