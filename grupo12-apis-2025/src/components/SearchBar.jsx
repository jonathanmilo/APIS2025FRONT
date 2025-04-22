import { useState } from "react";

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
            className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text border-brand-gray focus:border-brand-green focus:pl-16 focus:pr-4"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            value={terminoBusqueda}
            onChange={handleBusquedaChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-brand-gray px-3.5 peer-focus:border-brand-green peer-focus:stroke-brand-green-hover"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
