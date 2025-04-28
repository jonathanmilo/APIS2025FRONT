import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

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
              key={prod._id}
              onClick={() => navigate(`/catalogo/${prod._id}`)}
              className="min-w-[180px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[260px] xl:min-w-[280px] flex flex-col bg-white overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <img
                src={prod.images[0].url}
                alt={prod.title}
                className="w-full h-36 sm:h-40 md:h-44 object-cover"
              />
              <div className="flex flex-col justify-between p-3 flex-grow h-40 sm:h-44 md:h-48">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-brand-black text-sm md:text-base uppercase line-clamp-2">
                    {prod.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {prod.description}
                  </p>
                </div>
                <p className="text-lg font-semibold text-brand-black mt-2">
                  ${prod.price}
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
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 z-20 flex items-center justify-center bg-white bg-opacity-50 rounded-full hover:bg-opacity-70 transition-opacity cursor-pointer shadow-lg"
          aria-label="Anterior"
        >
          <SlArrowLeft className="text-brand-black text-lg" />
        </button>
      )}

      {/* Flecha derecha */}
      {showRightBtn && (
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 z-20 flex items-center justify-center bg-white bg-opacity-50 rounded-full hover:bg-opacity-70 transition-opacity cursor-pointer shadow-lg"
          aria-label="Siguiente"
        >
          <SlArrowRight className="text-brand-black text-lg" />
        </button>
      )}
    </section>
  );
}
