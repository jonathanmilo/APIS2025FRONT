import { useState, useEffect, useRef } from "react";
import { useProductos } from "@src/contexts/ProductContext";
import { filtrarPorNombre } from "@src/utils/filtrarProductos";
import { calcularPrecio } from "@src/utils/calcularPrecio";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchBarDropdown = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { productos } = useProductos();

  const dropdownRef = useRef(null);

  const filteredItems = filtrarPorNombre(productos, search);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 w-100" ref={dropdownRef}>
      {/* Input busqueda */}
      <div className="flex items-center py-3 px-4 bg-gray-50 dark:bg-[color:var(--color-gray)] border-1 border-gray-200 dark:border-[color:var(--color-light-gray)] sticky top-0">
        <CiSearch className="text-gray-400 dark:text-gray-50 mr-4 text-2xl" />
        <input
          type="search"
          placeholder={"Buscar productos..."}
          className="w-full text-brand-black dark:text-white font-thin bg-transparent focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Dropdown resultados */}
      {open && search.trim() !== "" && (
        <ul className="absolute top-full left-0 w-full max-h-96 overflow-y-auto bg-white dark:bg-[color:var(--color-gray)] shadow-lg z-50">
          {filteredItems.length === 0 ? (
            <li className="text-gray-500 italic p-4">Sin resultados</li>
          ) : (
            filteredItems.map((item) => {
              const coverImage = item.images.find((img) => img.cover);
              const precioFinal = calcularPrecio(
                item.price,
                item.discountPercentage
              );

              return (
                <li
                  key={item.id}
                  className="p-4 border-b border-gray-200 dark:border-[color:var(--color-light-gray)] flex items-center gap-4 hover:bg-gray-50 hover:dark:bg-[color:var(--color-light-gray)] cursor-pointer"
                  onClick={() => {
                    setSearch(item.title);
                    setOpen(false);
                    navigate(`/catalogo/${item.id}`);
                  }}
                >
                  <img
                    src={coverImage?.url}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-black dark:text-white">
                      {item.title}
                    </span>
                    <div className="text-black dark:text-white text-lg">
                      {item.discountPercentage > 0 ? (
                        <>
                          <span className="font-bold mr-2">${precioFinal}</span>
                          <span className="line-through text-sm text-gray-500 dark:text-primary">
                            ${item.price}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold">${item.price}</span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBarDropdown;
