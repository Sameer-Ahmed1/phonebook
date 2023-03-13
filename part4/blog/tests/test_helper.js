const Blog = require("../models/blogs.js");

const initialBlogs = [
  {
    title: "cybersecurity",
    author: "john deere",
    url: "example.com/1",
    likes: 122,
  },
  {
    title: "hello world",
    author: "ralph lauren",
    url: "example.com/2",
    likes: 534,
  },
  {
    title: "java portablility ",
    author: "jason man",
    url: "example.com/3",
    likes: 434,
  },
  {
    title: "oop is best",
    author: "beneddict muss",
    url: "example.com/4",
    likes: 1,
  },
];
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
