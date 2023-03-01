require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
morgan.token("data", (request, response) => {
  return JSON.stringify(request.body);
});
const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :data",
    {
      skip: function (req, res) {
        return req.method !== "POST";
      },
    }
  )
);

app.get("/", (request, response) => {
  response.send("hello ");
});
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      console.log("persons fetched successfully");
      response.json(persons);
    })
    .catch((error) => next(error));
});
app.get("/info", (request, response, next) => {
  Person.estimatedDocumentCount()
    .then((totalPersons) => {
      console.log("info fetched successfully");
      const responseHtml = `Phonebook has info for ${totalPersons}<br>${Date()}`;
      response.send(responseHtml);
    })
    .catch((error) => next(error));
});
app.get("/api/persons/:id", (request, response, next) => {
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
app.delete("/api/persons/:id", (request, response, next) => {
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

app.post("/api/persons", (request, response, next) => {
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
app.put("/api/persons/:id", (request, response, next) => {
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
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
