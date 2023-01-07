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
    console.log("useeffect 1 is called");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountriesData(response.data);
      console.log(
        "data from restcountries is fetched and countriesData is changed"
      );
    });
  }, []);
  useEffect(() => {
    console.log("useeffect 2 is called");
    let countriesFiltered = countriesData.filter((country) => {
      return searchInput
        ? country.name.official.toLowerCase().includes(searchInput)
        : false;
    });
    console.log("countries are filtered ", countriesFiltered);
    if (countriesFiltered.length == 1) {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${countriesFiltered[0].latlng.join()}`
        )
        .then((response) => {
          console.log(
            "weather data is fetched and countriesSearched is changed"
          );
          countriesFiltered[0].weather = response.data;
          setCountriesSearched(countriesFiltered);
        });
    } else {
      setCountriesSearched(countriesFiltered);
      console.log("countriesSearched is changed");
    }
  }, [searchInput]);
  console.log("App rendered!");
  return (
    <div>
      <Search
        searchValue={searchInput}
        handleSearchChange={(event) => {
          setSearchInput(event.target.value);
          console.log("search input changed");
        }}
      />
      <Country countries={countriesSearched} />
    </div>
  );
};
export default App;
