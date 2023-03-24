const Filter = ({ filterValue, handleFilterChange }) => (
  <div>
    filter by :{" "}
    <input type="text" value={filterValue} onChange={handleFilterChange} />
  </div>
);

export default Filter;

