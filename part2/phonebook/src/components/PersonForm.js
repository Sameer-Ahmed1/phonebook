const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      name:{" "}
      <input
        type="text"
        value={props.newNameValue}
        onChange={props.handleNameInputChange}
      />
    </div>
    <br></br>
    <div>
      number:{" "}
      <input
        type="text"
        value={props.newNumberValue}
        onChange={props.handleNumberInputChange}
      />
    </div>
    <br></br>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
export default PersonForm;
