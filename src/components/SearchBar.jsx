import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar({ buscar }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    setTerminoBusqueda(valor);
    buscar(valor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="search"
            className="peer cursor-pointer text-black dark:text-white relative z-10 h-13 w-13 rounded-full border-2 bg-transparent pl-12 outline-none transition-all duration-300 ease-in-out focus:w-64 focus:cursor-text focus:pl-16 focus:pr-4 border-primary"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            value={terminoBusqueda}
            onChange={handleBusquedaChange}
          />
          <CiSearch className="absolute text-primary inset-y-0 my-auto h-8 w-13 border-r border-transparent stroke-brand-gray px-3.5 peer-focus:border-primary peer-focus:stroke-primary-hover" />
        </form>
    </div>
  );
}

export default SearchBar;
