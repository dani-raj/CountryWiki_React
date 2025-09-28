import { createContext } from "react";

export interface VisitedCountriesContextType {
  visited: string[];
  toggleVisited: (code: string) => void;
}

export const VisitedCountriesContext =
  createContext<VisitedCountriesContextType | undefined>(undefined);
