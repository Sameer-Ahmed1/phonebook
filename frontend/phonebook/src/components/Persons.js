import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Numbers</h2>
      <div className="row">
        {persons.map((person) => (
          <div key={person.id} className="col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">{person.number}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePerson(person.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
