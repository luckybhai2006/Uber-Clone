import React, { createContext, useState, useContext } from 'react';

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [VehicalType, setVehicalType] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");

  return (
    <RideContext.Provider value={{ VehicalType, setVehicalType, vehicleImage, setVehicleImage }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => useContext(RideContext);
