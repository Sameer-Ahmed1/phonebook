const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blogs.js");
const helper = require("./test_helper.js");
const User = require("../models/user.js");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const user = await User.findOne({ username: helper.initialUser.username });
  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user._id })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("correct amount of blog posts in JSON format are returned ", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});
test("blog id is defined", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];
  expect(blog.id).toBeDefined();
});
test("a valid blog can be added", async () => {
  const user = await User.findOne({ username: helper.initialUser.username });
  const validBlog = {
    title: "basic trignometry",
    author: "matt watson",
    url: "example.com/6",
    likes: 100,
    user: user._id,
  };
  const token = await helper.generateToken(user.username);
  await api
    .post("/api/blogs/")
    .set("Authorization", `Bearer ${token}`)
    .send(validBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("default value of likes is zero if not provided", async () => {
  const user = await User.findOne({ username: helper.initialUser.username });
  const blog = {
    title: "likes is not provided",
    author: "sam hemworth",
    url: "example.com/6",
    user: user._id,
  };
  const token = await helper.generateToken(user.username);

  const response = await api
    .post("/api/blogs/")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  expect(response.body.likes).toBe(0);
});
test("fails with 400 bad req if title or url is missing", async () => {
  const user = await User.findOne({ username: helper.initialUser.username });
  const token = await helper.generateToken(user.username);

  const blog = {};
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(400);
}, 10000);
test("blog with valid id can be deleted ", async () => {
  const blogsBefore = await helper.blogsInDb();
  const user = await User.findOne({ username: helper.initialUser.username });
  const token = await helper.generateToken(user.username);

  const id = blogsBefore[0].id;
  await api
    .delete(`/api/blogs/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).not.toContainEqual({ id: id });
});
test("likes can be updated", async () => {
  const blogsBefore = await helper.blogsInDb();
  const blogSample = blogsBefore[0];
  const blog = {
    ...blogSample,
    likes: blogSample.likes + 10,
  };
  const id = blogSample.id;
  const response = await api
    .put(`/api/blogs/${id}`)
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toEqual({ ...blog, user: blog.user.toString() });
});
afterAll(async () => {
  await mongoose.connection.close();
});
