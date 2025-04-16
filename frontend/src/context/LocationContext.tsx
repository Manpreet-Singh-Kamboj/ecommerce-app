import { createContext, useState } from "react";
import * as Location from "expo-location";

interface LocationContextType {
  location: Location.LocationObjectCoords | null;
  setLocation: (location: Location.LocationObjectCoords | null) => void;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: (location: Location.LocationObjectCoords | null) => {},
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
