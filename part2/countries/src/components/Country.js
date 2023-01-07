import DisplayBox from "./DisplayBox.js";
import Header from "./Header.js";
const Country = ({ countries }) => {
  if (countries.length >= 2 && countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <DisplayBox
            text={country.name.official}
            key={country.name.official}
          />
        ))}
      </div>
    );
  } else if (countries.length > 10) {
    return <DisplayBox text={"too many countries"} />;
  } else if (countries.length == 1) {
    const country = countries[0];
    return (
      <div>
        <Header text={country.name.official} />
        <DisplayBox
          text={`capital ${country.capital ? country.capital[0] : ""}`}
        />
        <DisplayBox text={`area ${country.area}`} />
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages || {}).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common}></img>
        <h2>Weather</h2>
        <DisplayBox
          text={`temperature : ${country.weather.current.temp_c} c`}
        />
        <img
          src={`http:${country.weather.current.condition.icon}`}
          alt="weather"
        />
        <DisplayBox text={country.weather.current.condition.text} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Country;
