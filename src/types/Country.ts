export interface Country {
  cca3: string;

  name: {
    common: string;
    official: string;
  };

  flags: {
    png: string;
    svg: string;
    alt?: string;
  };

  capital?: string[];
  region?: string;
  subregion?: string;

  population?: number;
  area?: number;

  languages?: {
    [key: string]: string;
  };

  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };

  timezones?: string[];

  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };

  borders?: string[];
}
