const Person = require("../models/person.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const personsRouter = require("express").Router();

personsRouter.get("/", (request, response) => {
  response.send("hello ");
});
personsRouter.get("/api/persons", (request, response, next) => {
  Person.find({})
    .populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
    .then((persons) => {
      console.log("persons fetched successfully");
      response.json(persons);
    })
    .catch((error) => next(error));
});

personsRouter.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      return response.status(400).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const userid = user.id;
    //check whether the user (from token) matches  user (from blog)
    const id = request.params.id;
    const person = await Person.findById(id);
    if (person.user.toString() === userid.toString()) {
      const personDeleted = await Person.findByIdAndDelete(id);
      if (personDeleted) {
        console.log(
          `${personDeleted.name} ${personDeleted.number} deleted successfully!`
        );
        response.status(204).end();
      }
    } else {
      response.status(400).json({ error: "invalid user" });
    }
  } catch (error) {
    next(error);
  }
});

personsRouter.post("/api/persons", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      return response.status(400).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const person = new Person({ ...request.body, user: user._id });
    const savedPerson = await person.save();
    user.persons = user.persons.concat(savedPerson._id);
    await user.save();
    response.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
});
personsRouter.put("/api/persons/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      return response.status(400).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const userid = user.id;
    //check whether the user (from token) matches  user (from blog)
    const id = request.params.id;
    const person = await Person.findById(id);
    const body = request.body;

    if (person.user.toString() === userid.toString()) {
      const person = {
        name: body.name,
        number: body.number,
      };

      const updatedPerson = await Person.findByIdAndUpdate(
        request.params.id,
        person,
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      );
      console.log(
        `${updatedPerson.name} ${updatedPerson.number} update successfully`
      );
      response.json(updatedPerson);
    } else {
      response.status(400).json({ error: "invalid user" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = personsRouter;
