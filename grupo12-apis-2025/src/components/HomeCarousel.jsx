import { useEffect, useState } from "react";

const images = [
  "https://m.media-amazon.com/images/I/71n3URQek3L._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/81hxkKd9IgL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61nqLqnFKnL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71pXrwZWWXL._SX3000_.jpg"
];

export default function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden md:-mb-90">
      {/* Imagen con degradado usando un pseudo-overlay */}
      <div className="relative w-full h-[230px] sm:h-[350px] lg:h-[600px]">
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="absolute w-full h-full object-cover transform transition-transform duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-[#f7f7f7]"></div>
      </div>

      {/* Flecha izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-20 md:top-1/4 transform -translate-y-1/2 w-10 h-10 z-20 flex items-center justify-center cursor-pointer"
        aria-label="Anterior"
      >
        <span className="block w-3 h-3 md:w-6 md:h-6 border-l-2 border-b-2 border-brand-black transform rotate-45"></span>
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-20 md:top-1/4 transform -translate-y-1/2 w-10 h-10 z-20 flex items-center justify-center cursor-pointer"
        aria-label="Siguiente"
      >
        <span className="block w-3 h-3 md:w-6 md:h-6 border-r-2 border-b-2 border-brand-black transform -rotate-45"></span>
      </button>
    </section>
  );
}
