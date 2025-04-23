import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel({ title, items }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(false);

  const updateButtonVisibility = () => {
    const el = carouselRef.current;
    if (!el) return;

    setShowLeftBtn(el.scrollLeft > 0);
    setShowRightBtn(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  };

  useEffect(() => {
    updateButtonVisibility();
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateButtonVisibility);
    window.addEventListener("resize", updateButtonVisibility);
    return () => {
      el.removeEventListener("scroll", updateButtonVisibility);
      window.removeEventListener("resize", updateButtonVisibility);
    };
  }, []);

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  return (
    <section className="relative py-4">
      {title && (
        <h2 className="md:text-xl px-4 mb-2 text-brand-black uppercase font-bold">
          {title}
        </h2>
      )}
      <div
        ref={carouselRef}
        className="overflow-x-auto no-scrollbar px-4 pb-4 scroll-smooth"
      >
        <div className="flex flex-row gap-4">
          {items.map((prod) => (
            <div
              key={prod.id_producto}
              onClick={() => navigate(`/products/${prod.id_producto}`)}
              className="min-w-[200px] lg:w-50 flex flex-col bg-white overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <img
                src={prod.images[0]}
                alt={prod.nombre}
                className="w-full h-40 object-cover"
              />
              <div className="flex flex-col p-2 justify-between h-[20vh] md:h-[12vh] lg:h-[25vh] xl:h-[20vh]">
                <div className="flex flex-grow flex-col">
                  <h3 className="font-bold text-brand-black text-sm uppercase h-11">
                    {prod.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {prod.descripcion}
                  </p>
                </div>
                <p className="text-xl font-semibold text-brand-black">
                  ${prod.precio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flecha izquierda */}
      {showLeftBtn && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 z-20 flex items-center justify-center bg-white bg-opacity-50 rounded-full hover:bg-opacity-70 transition-opacity cursor-pointer shadow-lg"
          aria-label="Anterior"
        >
          <span className="block w-2 h-2 border-l-2 border-b-2 border-gray-800 transform rotate-45"></span>
        </button>
      )}

      {/* Flecha derecha */}
      {showRightBtn && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 z-20 flex items-center justify-center bg-white bg-opacity-50 rounded-full hover:bg-opacity-70 transition-opacity cursor-pointer shadow-lg"
          aria-label="Siguiente"
        >
          <span className="block w-2 h-2 border-r-2 border-b-2 border-gray-800 transform -rotate-45"></span>
        </button>
      )}
    </section>
  );
}
