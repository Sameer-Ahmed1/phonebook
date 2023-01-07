import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Country from "./components/Country";
const App = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [searchInput, setSearchInput] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [countriesSearched, setCountriesSearched] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountriesData(response.data);
    });
  }, []);
  useEffect(() => {
    let countriesFiltered = countriesData.filter((country) => {
      return searchInput
        ? country.name.official.toLowerCase().includes(searchInput)
        : false;
    });
    if (countriesFiltered.length == 1) {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${countriesFiltered[0].latlng.join()}`
        )
        .then((response) => {
          countriesFiltered[0].weather = response.data;
          setCountriesSearched(countriesFiltered);
        });
    } else {
      setCountriesSearched(countriesFiltered);
    }
  }, [searchInput]);
  return (
    <div>
      <Search
        searchValue={searchInput}
        handleSearchChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />
      <Country countries={countriesSearched} />
    </div>
  );
};
export default App;
