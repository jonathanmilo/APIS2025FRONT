import { useState, useContext } from "react";
import Barra_busqueda_productos from "./Barra_busqueda_productos";
import Botones_usuario from "./Botones_usuario.jsx";
import { usarContextoUsuario } from "../Context.jsx";

function Header({ onActualizarValor, buscar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const usuario = usarContextoUsuario();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleClick = () => {
    onActualizarValor("Nuevo valor desde Header");
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-3 bg-white lg:px-12 shadow border-t-2 border-lime-500 sticky top-0 z-50">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 lg:pb-0">
        {/* Logo y Nombre */}
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16 gap-1">
          <img className="w-8" src="/icon.svg" alt="" />
          <span className="font-semibold text-xl tracking-tight text-lime-500">
            Tienda.
          </span>
        </div>

        {/* Menú Mobile */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 rounded border-1 text-gray-500  border-gray-300  hover:text-lime-300"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="w-full lg:hidden">
          <div className="flex flex-col right-0 fixed bg-white w-screen gap-10 p-3 shadow-lg">
            <div className="text-md font-bold text-gray-600 lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-3 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Inicio
              </a>
              <a
                href="#responsive-header"
                className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-3 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Productos
              </a>
            </div>
            <div className="flex">
              <button
                onClick={handleClick}
                className="block text-md h-10 px-4  ml-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg transition-colors lg:mt-0"
              >
                Iniciar Sesión
              </button>

              <button className=" block text-md h-10 px-4  ml-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg transition-colors lg:mt-0">
                Creá tu cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 gap-4">
        {/* Menú lateral */}
        <div className="text-md font-bold lg:flex-grow hidden lg:flex gap-4">
          <a
            href="#"
            className="text-gray-600 px-4 py-2 rounded hover:text-lime-500"
          >
            Inicio
          </a>
          <a
            href="#"
            className="text-gray-600 px-4 py-2 rounded hover:text-lime-500"
          >
            Productos
          </a>
        </div>

        {/* Barra de búsqueda */}
        <div className="hidden lg:block text-gray-600">
          <Barra_busqueda_productos buscar={buscar} />
        </div>

        {/* Botones */}
        <div className="flex items-center space-x-4 lg:mt-0">
          {usuario ? (
            <Botones_usuario />
          ) : (
            <button
              onClick={handleClick}
              className="px-4 py-2 hidden lg:block bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-lg transition-colors"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
