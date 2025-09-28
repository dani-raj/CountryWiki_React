import { useEffect, useState } from "react";
import CountriesList from "../../components/CountriesList/CountriesList";
import type { Country } from "../../types/Country";
import { getAllCountries } from "../../services/api";
import styles from "./Home.module.css";
import Loading from "../../components/LoadingBar/LoadingBar";

function Home() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [regions, setRegions] = useState<string[]>(["All"]);
  const [languages, setLanguages] = useState<string[]>(["All"]);
  const [currencies, setCurrencies] = useState<string[]>(["All"]);

  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState("All");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllCountries();
        const sorted = [...data].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        // unique values kigyűjtése
        const regionSet = new Set<string>();
        const langSet = new Set<string>();
        const currSet = new Set<string>();

        sorted.forEach((c) => {
          if (c.region) regionSet.add(c.region);
          if (c.languages) {
            Object.values(c.languages).forEach((lang) => lang && langSet.add(lang));
          }
          if (c.currencies) {
            Object.values(c.currencies).forEach(
              (cur) => cur?.name && currSet.add(cur.name)
            );
          }
        });

        setRegions(["All", ...Array.from(regionSet).sort()]);
        setLanguages(["All", ...Array.from(langSet).sort()]);
        setCurrencies(["All", ...Array.from(currSet).sort()]);

        setAllCountries(sorted);
      } catch (err) {
        console.log(err);
        setError("Could not load countries");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = allCountries.filter((c) => {
    const matchesSearch = c.name.common
      .toLowerCase()
      .startsWith(searchQuery.trim().toLowerCase());

    const matchesRegion =
      selectedRegion === "All" || c.region === selectedRegion;

    const matchesLanguage =
      selectedLanguage === "All" ||
      (c.languages && Object.values(c.languages).includes(selectedLanguage));

    const matchesCurrency =
      selectedCurrency === "All" ||
      (c.currencies &&
        Object.values(c.currencies).some((cur) => cur?.name === selectedCurrency));

    return matchesSearch && matchesRegion && matchesLanguage && matchesCurrency;
  });

  const visibleCountries = filtered.slice(0, visibleCount);

  if (loading) return <Loading />;
  if (error) return <p className={styles.centered}>{error}</p>;

  return (
    <div className={styles.home}>
      <header className={styles.hero}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="🔍 Search country..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(50);
            }}
          />
        </div>

        <div className={styles.dropdownGroup}>
          <div className={styles.filter}>
            <label>Filter by Continent</label>
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setVisibleCount(50);
              }}
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filter}>
            <label>Filter by Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setVisibleCount(50);
              }}
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filter}>
            <label>Filter by Currency</label>
            <select
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
                setVisibleCount(50);
              }}
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <CountriesList countries={visibleCountries} />

      {visibleCount < filtered.length && (
        <button
          className={styles.loadMore}
          onClick={() => setVisibleCount((prev) => prev + 50)}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;
