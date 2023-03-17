const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const helper = require("./test_helper.js");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash(helper.initialUser.password, 10);
  const { username, name } = helper.initialUser;
  const user = new User({ username: username, name: name, passwordHash });
  await user.save();
});
test("all users are returned as json with all properties", async () => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  response.body.forEach((res) => {
    expect(Object.keys(res)).toContain("username");
    expect(Object.keys(res)).toContain("id");
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
test("creation fails if username and password is not provided ", async () => {
  const newUser = {
    name: "mattilukk",
  };
  await api.post("/api/users").send(newUser).expect(400);
});
test("creation fails if username is not unique", async () => {
  const newUser = helper.initialUser;
  await api.post("/api/users").send(newUser).expect(400);
});
test("creation fails if username and password are less than 3 characters long ", async () => {
  const newUser = {
    username: "fj",
    name: "ffffff",
    password: "fj",
  };
  await api.post("/api/users").send(newUser).expect(400);
});
afterAll(async () => {
  await mongoose.connection.close();
});
