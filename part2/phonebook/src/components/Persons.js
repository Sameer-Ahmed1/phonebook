import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleClick={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
