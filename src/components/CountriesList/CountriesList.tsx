import CountryCard from "../CountyCard/CountryCard";
import type { Country } from "../../types/Country";
import styles from "./CountriesList.module.css";

interface CountriesListProps {
  countries: Country[];
}

const CountriesList = ({ countries }: CountriesListProps) => {
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default CountriesList;
