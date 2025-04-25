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
    <div className="relative rounded-2xl bg-white sm:mx-auto sm:max-w-lg">
      <div className="mx-auto max-w-md">
        <form onSubmit={handleSubmit} className="relative mx-auto w-max">
          <input
            type="search"
            className="peer cursor-pointer text-gray-500 relative z-10 h-12 w-12 rounded-full border-1 bg-transparent pl-12 outline-none border-brand-gray transition-all duration-300 ease-in-out focus:w-64 focus:cursor-text focus:pl-16 focus:pr-4 focus:border-brand-main"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            value={terminoBusqueda}
            onChange={handleBusquedaChange}
          />
          <CiSearch className="absolute text-brand-black inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-brand-gray px-3.5 peer-focus:border-brand-main peer-focus:stroke-brand-main-hover" />
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
