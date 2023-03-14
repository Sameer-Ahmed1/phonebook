const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const helper = require("./test_helper.js");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", name: "lam adamea", passwordHash });
  await user.save();
});
test("all users are returned as json with all properties", async () => {
  const requiredKeys = ["username", "name", "id"];
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  response.body.forEach((res) => {
    expect(Object.keys(res)).toEqual(requiredKeys);
  });
});
test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  expect(usernames).toContain(newUser.username);
});

afterAll(async () => {
  await mongoose.connection.close();
});
