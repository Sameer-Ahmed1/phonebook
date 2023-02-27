const { response, json } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
morgan.token("data", (request, response) => {
  return JSON.stringify(request.body);
});
const app = express();
app.use(cors());
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
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("hello ");
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/info", (request, response) => {
  const totalPersons = persons.length;
  const responseHtml = `Phonebook has info for ${totalPersons}<br>${Date()}`;
  response.send(responseHtml);
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => {
    return person.id === id;
  });

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "Person with specified id is not found";
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
const generateId = () => {
  return Math.trunc(Math.random() * 1000);
};
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const id = generateId();
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "missing name or number" });
  }
  const searched = persons.find((person) => person.name === body.name);
  if (searched) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: id,
  };
  persons = persons.concat(person);
  response.json(person);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
