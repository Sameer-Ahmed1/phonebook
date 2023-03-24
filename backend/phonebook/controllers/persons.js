const Person = require("../models/person.js");

const personsRouter = require("express").Router();

personsRouter.get("/", (request, response) => {
  response.send("hello ");
});
personsRouter.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      console.log("persons fetched successfully");
      response.json(persons);
    })
    .catch((error) => next(error));
});
personsRouter.get("/info", (request, response, next) => {
  Person.estimatedDocumentCount()
    .then((totalPersons) => {
      console.log("info fetched successfully");
      const responseHtml = `Phonebook has info for ${totalPersons}<br>${Date()}`;
      response.send(responseHtml);
    })
    .catch((error) => next(error));
});
personsRouter.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((personFound) => {
      if (personFound) {
        console.log(
          `${personFound.name} ${personFound.number} fetched successfully `
        );
        response.json(personFound);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
personsRouter.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then((personDeleted) => {
      if (personDeleted) {
        console.log("in the personDelete function", personDeleted);
        console.log(
          `${personDeleted.name} ${personDeleted.number} deleted successfully!`
        );
        response.status(204).end();
      } else {
        response.status(204).end();
      }
    })
    .catch((error) => next(error));
});

personsRouter.post("/api/persons", (request, response, next) => {
  const body = request.body;
  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: "missing name or number" });
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});
personsRouter.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "missing name or number" });
  }
  //normal javascript object
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      console.log(
        `${updatedPerson.name} ${updatedPerson.number} update successfully`
      );
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
