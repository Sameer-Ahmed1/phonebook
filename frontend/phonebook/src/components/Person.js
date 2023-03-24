const Person = ({ name, number, handleClick }) => (
  <div>
    {name} {number} {"   "}
    <button onClick={handleClick}> delete </button> <br></br>
    <br></br>
  </div>
);

export default Person;
