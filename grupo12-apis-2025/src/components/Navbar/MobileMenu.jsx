import React from "react";
import { NAVBAR_MENU } from "../../global/store";
import { Link } from "react-router-dom";

const MobileMenu = ({ open, setOpen }) => {
  return (
    <div
      className={`fixed top-[80px] right-0 w-full h-[calc(100vh-80px)] bg-white z-40 transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      } md:hidden shadow-lg`}
    >
      <ul className="flex flex-col items-center justify-center h-full gap-8 text-xl font-semibold text-brand-black">
        {NAVBAR_MENU.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              onClick={() => setOpen(false)}
              className="hover:text-brand-main"
            >
              {item.title}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to={"/ingresar"}
            onClick={() => setOpen(false)}
            className="hover:bg-brand-main cursor-pointer bg-white text-brand-main font-semibold hover:text-white duration-200 rounded-md border-2 border-brand-main px-6 py-2"
          >
            Ingresar
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
