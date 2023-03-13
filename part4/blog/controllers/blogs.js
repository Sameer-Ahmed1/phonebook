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
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const blogDeleted = await Blog.findByIdAndRemove(id);
    if (blogDeleted) {
      logger.info(
        `${blogDeleted.title} ${blogDeleted.author} deleted successfully!`
      );
      response.status(204).end();
    } else {
      response.status(204).end();
    }
  } catch (error) {
    next(error);
  }
});
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;
    //normal javascript object
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
