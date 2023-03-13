const logger = require("../utils/logger.js");
const Blog = require("../models/blogs.js");

const blogsRouter = require("express").Router();
blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  if (blogs) {
    logger.info("blogs fetched successfully!");
    response.json(blogs);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  if (savedBlog) {
    response.status(201).json(savedBlog);
  }
});
module.exports = blogsRouter;
