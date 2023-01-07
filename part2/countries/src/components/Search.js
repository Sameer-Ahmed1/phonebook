const Search = ({ searchValue, handleSearchChange }) => (
  <div>
    filter by :{" "}
    <input type="text" value={searchValue} onChange={handleSearchChange} />
  </div>
);

export default Search;
