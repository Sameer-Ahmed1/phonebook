const logger = require("../utils/logger.js");
const Blog = require("../models/blogs.js");

const blogsRouter = require("express").Router();
blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogsFound = await Blog.find({});
    if (blogsFound) {
      logger.info("blogs fetched successfully!");
      response.json(blogsFound);
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const blogSaved = await blog.save();
    reponse.status(201).json(blogSaved);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
