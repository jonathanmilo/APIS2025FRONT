import { useState, useContext } from "react";
import SearchBar from "./SearchBar.jsx";
import UserMenu from "./UserMenu.jsx";
import { usarContextoUsuario } from "../contexts/Context.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { STORE_NAME } from "../global/store.js";
import Carrito from "./Carrito.jsx";

function Navbar({ onActualizarValor, buscar }) {
  const usuario = usarContextoUsuario();

  const navigate = useNavigate();
  const location = useLocation();
  const esLogin = location.pathname === "/login";
  const esProfile = location.pathname === "/profile";

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [carritoVisible, setCarritoVisible] = useState(false);
  const toggleCarrito = () => setCarritoVisible(!carritoVisible);

  const handleClick = () => {
    onActualizarValor("Nuevo valor desde Header");
  };

  return (
    <nav className="flex flex-row gap-5 h-[10vh] md:h-[8vh] lg:h-[13vh] items-center justify-center px-3 lg:text-sm xl:text-md bg-white xl:px-12 shadow border-t-2 border-brand-green sticky top-0 z-50">
      <div className="flex flex-row justify-between lg:w-auto w-full lg:border-b-0 lg:pb-0">
        {/* Logo y Nombre */}

        <button
          onClick={() => navigate("/")}
          className="flex items-center flex-shrink-0 text-brand-black gap-1"
        >
          <img className="w-8" src="/icon.svg" alt="" />
          <span className="font-semibold text-xl tracking-tight text-brand-green cursor-pointer">
            {STORE_NAME}
          </span>
        </button>

        {/* Menú Mobile */}

        {!esLogin && !esProfile && (
          <div className="flex flex-row lg:hidden">
            <button onClick={toggleCarrito} className="w-10 h-10 rounded-full">
              <i className="fa-solid fa-cart-shopping text-brand-black"></i>
            </button>
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-10 h-10 gap-1 text-brand-black"
            >
              <span className="block w-5 h-0.5 bg-current"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
            </button>
            {/* Carrito desplegable */}
            {carritoVisible && (
              <div className="absolute top-15 right-4 bg-white shadow-lg rounded-lg p-4 w-80 z-50 border-1 border-brand-light-gray">
                <Carrito />
              </div>
            )}
          </div>
        )}
      </div>

      {menuOpen && (
        <>
          <div className="relative z-50 lg:hidden">
            <div
              className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                menuOpen ? "opacity-20" : "opacity-0 pointer-events-none"
              }`}
              onClick={toggleMenu}
            />

            <div
              className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } transform`}
            >
              <div className="flex justify-end p-4 border-b border-brand-light-gray">
                <button
                  onClick={toggleMenu}
                  className="text-brand-black text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col justify-between flex-grow overflow-y-auto px-5 py-6">
                <div className="flex flex-col items-start">
                  <button
                    onClick={() => navigate("/")}
                    className="text-brand-black rounded hover:text-brand-green pb-3 border-b-1 border-brand-light-gray w-full text-start"
                  >
                    Inicio
                  </button>
                  <button
                    onClick={() => navigate("/products")}
                    className="text-brand-black rounded hover:text-brand-green py-3 border-b-1 border-brand-light-gray w-full text-start"
                  >
                    Productos
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-6 border-t">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white font-medium rounded-lg transition-colors"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full px-4 py-2 bg-white hover:bg-brand-green hover:text-white text-brand-green border-1 border-brand-green font-medium rounded-lg transition-colors"
                  >
                    Creá tu cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Menú Grande */}

      {!esLogin && !esProfile && (
        <div className="hidden menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 gap-4">
          <div className="text-md font-bold lg:flex-grow hidden lg:flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-brand-black xl:ml-5 px-2 xl:px-4 py-2 rounded hover:text-brand-green cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-brand-black px-2 xl:px-4 py-2 rounded hover:text-brand-green cursor-pointer"
            >
              Productos
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden lg:block text-brand-gray">
            <SearchBar buscar={buscar} />
          </div>

          {/* Botones */}
          <div className="flex items-center space-x-4 lg:mt-0">
            {usuario ? (
              <UserMenu />
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 hidden lg:block bg-brand-green hover:bg-brand-green-hover text-white font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 hidden lg:block bg-white hover:bg-brand-green hover:text-white text-brand-green border-1 border-brand-green font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Creá tu cuenta
                </button>
                <UserMenu />
              </>
            )}

            {/* Botón para abrir el carrito */}
            <button
              onClick={toggleCarrito}
              className="w-8 h-8 rounded-full cursor-pointer"
            >
              <i className="fa-solid fa-cart-shopping text-brand-black"></i>
            </button>
          </div>

          {/* Carrito desplegable */}
          {carritoVisible && (
            <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg p-4 w-80 z-50 border-1 border-brand-light-gray">
              <Carrito />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
