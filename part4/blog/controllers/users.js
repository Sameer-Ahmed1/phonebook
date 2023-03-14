const logger = require("../utils/logger.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});
userRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;
