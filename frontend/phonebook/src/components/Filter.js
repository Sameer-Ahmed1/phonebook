const Filter = ({ filterValue, handleFilterChange }) => (
  <div className="my-3">
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">Filter By:</span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={filterValue}
        onChange={handleFilterChange}
      />
    </div>
  </div>
);

export default Filter;
