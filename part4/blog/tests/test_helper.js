const Blog = require("../models/blogs.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

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
const initialUser = {
  username: "root",
  name: "lam adamea",
  password: "fljsf",
};
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};
const generateToken = async (username) => {
  const user = await User.findOne({ username });
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET
  );
  return token;
};
module.exports = {
  initialBlogs,
  initialUser,
  blogsInDb,
  usersInDb,
  generateToken,
};
