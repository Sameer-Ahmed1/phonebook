const logger = require("../utils/logger.js");
const jwt = require("jsonwebtoken");

const Blog = require("../models/blogs.js");
const User = require("../models/user.js");
const blogsRouter = require("express").Router();
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};
blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
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
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken) {
      return response.status(400).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({ ...request.body, user: user._id });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
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
      user: body.user,
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
