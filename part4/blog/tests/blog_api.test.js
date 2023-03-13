const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blogs.js");

const api = supertest(app);
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

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("correct amount of blog posts in JSON format are returned ", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(4);
});

afterAll(async () => {
  await mongoose.connection.close();
});
