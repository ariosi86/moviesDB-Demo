import movies from "./peliculas.json";

const fetch = (data, time = 0) => {
  return new Promise((resolve, reject) => {
    // Simula una solicitud de datos con setTimeout
    setTimeout(() => {
      resolve(data); // Completa la promesa con los datos
    }, time);
  });
};

const Services = {};

Services.getMovies = async () => {
  await fetch(movies, 100);
  return movies;
};

export default Services;
