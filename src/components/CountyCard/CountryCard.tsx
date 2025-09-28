import type { Country } from "../../types/Country";
import styles from "../CountyCard/CountryCard.module.css";
import { Link } from "react-router-dom";
import { FaStamp } from "react-icons/fa";
import { useVisitedCountries } from "../../context/useVisitedCountries";

interface Props {
  country: Country;
}

const CountryCard = ({ country }: Props) => {
  const { visited, toggleVisited } = useVisitedCountries();
  const isVisited = visited.includes(country.cca3);

  return (
    <Link to={`/country/${country.cca3}`} className={styles.countryCard}>
      <div className={styles.flagWrapper}>
        <img
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
        />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.countryName}>{country.name.common}</span>
        <button
          type="button"
          className={`${styles.stampBtn} ${isVisited ? styles.visited : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleVisited(country.cca3);
          }}
        >
          <FaStamp />
        </button>
      </div>
    </Link>
  );
};

export default CountryCard;
