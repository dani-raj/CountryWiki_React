import React, { useState, useEffect } from "react";
import { VisitedCountriesContext } from "./VisitedCountriesContext";

export const VisitedCountriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visited, setVisited] = useState<string[]>(() => {
    const stored = localStorage.getItem("visitedCountries");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("visitedCountries", JSON.stringify(visited));
  }, [visited]);

  const toggleVisited = (code: string) => {
    setVisited((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  return (
    <VisitedCountriesContext.Provider value={{ visited, toggleVisited }}>
      {children}
    </VisitedCountriesContext.Provider>
  );
};
