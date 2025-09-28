import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryByCode } from "../../services/api";
import type { Country } from "../../types/Country";
import styles from "./CountryDetail.module.css";
import { useVisitedCountries } from "../../context/useVisitedCountries";
import { FaStamp } from "react-icons/fa";
import Loading from "../../components/LoadingBar/LoadingBar";

function CountryDetail() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { visited, toggleVisited } = useVisitedCountries();

  useEffect(() => {
    if (!countryCode) return;
    getCountryByCode(countryCode)
      .then(setCountry)
      .catch(() => setError("Failed to load country"));
  }, [countryCode]);

  if (error) return <p>{error}</p>;
  if (!country) return <Loading />;

  const isVisited = visited.includes(country.cca3);

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.detailCard}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{country.name.common}</h1>
          <button
            className={`${styles.visitedBtn} ${
              isVisited ? styles.visited : ""
            }`}
            onClick={() => toggleVisited(country.cca3)}
            title={isVisited ? "Remove from visited" : "Mark as visited"}
          >
            <FaStamp />
          </button>
        </div>

        <img
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
          className={styles.flag}
        />

        <div className={styles.info}>
          <p>
            <strong>Official name:</strong> {country.name.official}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital?.join(", ")}
          </p>
          <p>
            <strong>Region:</strong> {country.region} ({country.subregion})
          </p>
          <p>
            <strong>Population:</strong>{" "}
            {country.population?.toLocaleString()}
          </p>
          <p>
            <strong>Area:</strong> {country.area?.toLocaleString()} km²
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {country.languages && Object.values(country.languages).join(", ")}
          </p>
          <p>
            <strong>Currencies:</strong>{" "}
            {country.currencies &&
              Object.values(country.currencies)
                .map((c) => c.name)
                .join(", ")}
          </p>
          <p>
            <strong>Timezones:</strong> {country.timezones?.join(", ")}
          </p>
          <p>
            <strong>Map:</strong>{" "}
            <a href={country.maps?.googleMaps} target="_blank" rel="noreferrer">
              View on Google Maps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;