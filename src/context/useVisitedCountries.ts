import { useContext } from "react";
import { VisitedCountriesContext } from "./VisitedCountriesContext";

export const useVisitedCountries = () => {
  const context = useContext(VisitedCountriesContext);
  if (!context) {
    throw new Error(
      "useVisitedCountries must be used within a VisitedCountriesProvider"
    );
  }
  return context;
};
