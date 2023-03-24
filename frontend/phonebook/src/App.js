import { useState, useEffect } from "react";
import personService from "./services/persons.js";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/notification.js";
import ErrorMessage from "./components/ErrorMessage.js";
import loginService from "./services/login";
import LoginForm from "./components/login.js";
import Display from "./components/Display.js";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [notification, setnotification] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      personService.getAll().then((response) => setPersons(response.data));
    }
  }, [user]);
  useEffect(() => {
    let personsNew = persons.filter((person) => {
      return person.name
        .toLowerCase()
        .startsWith(filter ? filter.toLowerCase() : "");
    });
    setPersonsFiltered(personsNew);
  }, [filter, persons]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPhonebookUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      personService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedPhonebookUser", JSON.stringify(user));
      personService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (!newName) {
      alert("Name field is empty");
      return;
    }
    if (!newNumber) {
      alert("Number field is empty");
      return;
    }
    const personFound = persons.find((person) => person.name === newName);
    if (personFound) {
      updatePerson(personFound);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService
      .createPerson(personObject)
      .then((response) => {
        setPersons(
          persons.concat({
            name: response.data.name,
            number: response.data.number,
            id: response.data.id,
          })
        );
        setnotification(`${response.data.name} added successfully! `);
        setTimeout(() => {
          setnotification("");
        }, 3000);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
    setNewNumber("");
    setNewName("");
  };

  const updatePerson = (personFound) => {
    if (
      window.confirm(
        `${newName} already exists, do you want to replace the old number with new one ?`
      )
    ) {
      personService
        .updateNumber({ ...personFound, number: newNumber })
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === response.data.id ? response.data : person
            )
          );
          setnotification(`${response.data.name}'s number updated succesfully`);
          setTimeout(() => {
            setnotification("");
          }, 3000);
        })
        .catch((error) => {
          setError(`${personFound.name} is already deleted`);
          setTimeout(() => {
            setError("");
          }, 3000);
          setPersons(persons.filter((person) => person.id !== personFound.id));
        });
    }
    setNewName("");
    setNewNumber("");
  };
  const deletePerson = (id) => {
    const personToBeDeleted = persons.find((person) => person.id === id);
    if (
      window.confirm(`Do you really want to delete ${personToBeDeleted.name})`)
    ) {
      personService
        .deletePerson(id)
        .then(() => personService.getAll())
        .then((response) => {
          setPersons(response.data);
          setnotification(`${personToBeDeleted.name} deleted successfully`);
          setTimeout(() => {
            setnotification("");
          }, 3000);
        })
        .catch((error) => {
          setError(`${personToBeDeleted.name} is already deleted`);
          setTimeout(() => {
            setError("");
          }, 3000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  const onNameInputChange = (event) => {
    setNewName(event.target.value);
  };
  const onNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };
  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleLogout = () => {
    if (user) {
      window.localStorage.removeItem("loggedPhonebookUser");
      window.location.href = "/";
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={error} />

      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      )}
      {user !== null && (
        <div>
          <div>
            <Display message={`${user.username} is logged in`} />{" "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <Filter filterValue={filter} handleFilterChange={onFilterChange} />
          <br></br>
          <br></br>
          <h2>Add new </h2>
          <PersonForm
            handleSubmit={addNewPerson}
            handleNameInputChange={onNameInputChange}
            handleNumberInputChange={onNumberInputChange}
            newNumberValue={newNumber}
            newNameValue={newName}
          />
          <Persons persons={personsFiltered} deletePerson={deletePerson} />
        </div>
      )}
    </div>
  );
};

export default App;
