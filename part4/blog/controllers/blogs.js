const logger = require("../utils/logger.js");
const Blog = require("../models/blogs.js");

const blogsRouter = require("express").Router();
blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  try {
    if (blogs) {
      logger.info("blogs fetched successfully!");
      response.json(blogs);
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});
blogsRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  Blog.findByIdAndRemove(id)
    .then((blogDeleted) => {
      if (blogDeleted) {
        logger.info(
          `${blogDeleted.title} ${blogDeleted.author} deleted successfully!`
        );
        response.status(204).end();
      } else {
        response.status(204).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
