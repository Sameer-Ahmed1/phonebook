const Person = ({ name, number, handleClick }) => (
  <div className="card mb-3 mx-auto" style={{ maxWidth: "600px" }}>
    <div className="card-body">
      <div className="row">
        <div className="col-8">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{number}</p>
        </div>
        <div className="col-4 text-right">
          <button className="btn btn-danger" onClick={handleClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Person;
