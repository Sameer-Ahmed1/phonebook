import React, { useState } from "react";

const PersonForm = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <button className="btn btn-primary mb-3" onClick={toggleVisibility}>
        {isHidden ? " + " : "collapse"}
      </button>

      {!isHidden && (
        <form onSubmit={props.handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Name:</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Sample name"
              value={props.newNameValue}
              onChange={props.handleNameInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberInput">Number:</label>
            <input
              type="text"
              className="form-control"
              id="numberInput"
              placeholder="000-0000"
              value={props.newNumberValue}
              onChange={props.handleNumberInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default PersonForm;
