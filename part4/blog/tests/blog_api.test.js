const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blogs.js");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
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
  const validBlog = {
    title: "basic trignometry",
    author: "matt watson",
    url: "example.com/6",
    likes: 100,
  };
  await api
    .post("/api/blogs/")
    .send(validBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("default value of likes is zero if not provided", async () => {
  const blog = {
    title: "likes is not provided",
    author: "sam hemworth",
    url: "example.com/6",
  };
  const response = await api
    .post("/api/blogs/")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  expect(response.body.likes).toBe(0);
});
test("fails with 400 bad req if title or url is missing", async () => {
  const blog = {};
  await api.post("/api/blogs").send(blog).expect(400);
}, 10000);
test("blog with valid id can be  deleted ", async () => {
  const blogsBefore = await helper.blogsInDb();
  const id = blogsBefore[0].id;
  await api.delete(`/api/blogs/${id}`).expect(204);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).not.toContainEqual({ id: id });
});
test("likes can be updated", async () => {
  const blogsBefore = await helper.blogsInDb();
  const blog = {
    ...blogsBefore[0],
    likes: blogsBefore[0].likes + 10,
  };
  const id = blogsBefore[0].id;
  const response = await api
    .put(`/api/blogs/${id}`)
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toEqual(blog);
});
afterAll(async () => {
  await mongoose.connection.close();
});
