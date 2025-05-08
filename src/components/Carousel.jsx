import { useRef, useState, useEffect } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import ProductCard from "./ProductCard";

export default function Carousel({ title, items }) {
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
              key={prod.id}
              className="min-w-[220px] md:min-w-[240px] lg:min-w-[250px] transition-transform duration-300 hover:scale-102"
            >
              <ProductCard producto={prod} />
            </div>
          ))}
        </div>
      </div>

      {showLeftBtn && (
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 z-20 flex items-center justify-center bg-white bg-opacity-50 rounded-full hover:bg-opacity-70 transition-opacity cursor-pointer shadow-lg"
          aria-label="Anterior"
        >
          <SlArrowLeft className="text-brand-black text-lg" />
        </button>
      )}

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
