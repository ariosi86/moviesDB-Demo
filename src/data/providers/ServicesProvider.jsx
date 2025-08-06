"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Services from "../api/mock";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [stateServices, setStateServices] = useState(false);

  const getMovies = async () => {
    const movies = await Services.getMovies();
    return movies;
  };

  const values = {
    stateServices,
    getMovies,
  };

  useEffect(() => {
    setStateServices(true);
  }, []);

  return (
    <ServicesContext.Provider value={values}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);

export { ServicesProvider, useServices };
