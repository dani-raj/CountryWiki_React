import { useVisitedCountries } from "../../context/useVisitedCountries";
import { useEffect, useState } from "react";
import { getCountryByCode, getAllCountries } from "../../services/api";
import type { Country } from "../../types/Country";
import CountriesList from "../../components/CountriesList/CountriesList";
import styles from "./VisitedCountries.module.css";
import Loading from "../../components/LoadingBar/LoadingBar";

function VisitedCountriesPage() {
  const { visited } = useVisitedCountries();
  const [countries, setCountries] = useState<Country[]>([]);
  const [totalCountries, setTotalCountries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!visited.length) {
          setCountries([]);
        } else {
          const promises = visited.map((code) => getCountryByCode(code));
          const results = await Promise.all(promises);

          const sorted = [...results].sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
          );
          setCountries(sorted);
        }

        const all = await getAllCountries();
        setTotalCountries(all.length);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visited]);



  if (!visited.length) {
    return (
      <p className={styles.center}>
        No visited countries yet.
      </p>
    );
  }

  if (loading) return <Loading />;

  const percentage = totalCountries
    ? ((visited.length / totalCountries) * 100).toFixed(1)
    : "0";

  const continents = new Set(countries.map((c) => c.region));

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Visited Countries</h1>

      <div className={styles.stats}>
        <p>
          🌍 You have visited <strong>{visited.length}</strong> countries out of{" "}
          <strong>{totalCountries}</strong>
        </p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p>{percentage}% of the world explored</p>

        <p>
          🗺️ Continents visited:{" "}
          <strong>{continents.size}</strong> / 6
        </p>
      </div>

      <CountriesList countries={countries} />
    </div>
  );
}

export default VisitedCountriesPage;