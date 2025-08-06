"use client";
import { useServices } from "@/data/providers/ServicesProvider";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const { getMovies } = useServices();
  const [peliculas, setPeliculas] = useState([]);
  const carouselRef = useRef(null);

  const loadMovies = async () => {
    try {
      const data = await getMovies();
      console.log(data);
      setPeliculas(data.movies);
    } catch (error) {
      console.error("Error loading movies:", error);
    }
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Películas</h1>

        <div className="relative alturaContenedor">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow z-10"
            aria-label="Scroll left"
          >
            ◀
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth py-4 px-2"
          >
            {peliculas.length > 0 ? (
              peliculas.map(({ id, titulo, director, año, imagen }) => (
                <div
                  key={id}
                  className="min-w-[220px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0"
                >
                  <img
                    src={imagen}
                    alt={`Poster de ${titulo}`}
                    className="alturaContenedor w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">{titulo}</h2>
                    <p className="text-gray-600 text-sm">
                      Director: {director}
                    </p>
                    <p className="text-gray-600 text-sm">Año: {año}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full">Cargando películas...</p>
            )}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow z-10"
            aria-label="Scroll right"
          >
            ▶
          </button>
        </div>
      </div>

      <style jsx>
        {`
          .alturaContenedor {
            height: 250px;
          }
        `}
      </style>
    </div>
  );
}
