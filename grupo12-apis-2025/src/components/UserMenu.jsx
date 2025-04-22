import { useEffect, useRef, useState } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setOpen((prev) => !prev);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="w-12 h-12 flex items-center justify-center text-white bg-brand-green rounded-full hover:bg-brand-green-hover transition"
      >
        <i className="fa-solid fa-user text-lg" />
      </button>

      {/* Menú desplegable */}
      <div
        ref={menuRef}
        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white transition-all duration-200 ease-out ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="py-2 px-2" role="menu">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-brand-black rounded-md hover:bg-brand-gray"
            role="menuitem"
          >
            Mi Perfil
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-brand-black rounded-md hover:bg-brand-gray"
            role="menuitem"
          >
            Compras
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-brand-black rounded-md hover:bg-brand-gray"
            role="menuitem"
          >
            Publicaciones
          </a>
          <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-brand-green text-white rounded-md text-sm hover:bg-brand-green-hover">
            <span className="leading-none flex items-center">
              Cerrar sesión
            </span>
            <i className="fa-solid fa-right-from-bracket text-white text-base leading-none flex items-center"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
