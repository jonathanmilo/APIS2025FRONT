import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contexts/UserContext";
import { BsCart4 } from "react-icons/bs";
import Badge from "@mui/material/Badge";
import { NAVBAR_MENU, STORE_NAME } from "../../global/store";
import MobileMenu from "./components/MobileMenu.jsx";
import UserMenu from "./components/User/UserMenu.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { usuario } = useUsuario();

  return (
    <>
      <nav className="sticky top-0 bg-white z-50 border-b-1 border-brand-light-gray">
        <div className="w-full px-5 lg:px-30 flex justify-between items-center py-6">
          <div className="text-2xl flex items-center gap-1 font-bold">
            <img src="/icon.svg" alt="" className="h-8" />
            <p className="text-brand-main">{STORE_NAME}</p>
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center gap-2 lg:gap-6 text-brand-black">
              {NAVBAR_MENU.map((item) => {
                return (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      className="relative inline-block py-1 px-3 font-semibold text-brand-black hover:text-brand-main transition-colors duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 before:bg-brand-main before:transition-all before:duration-300 hover:before:w-full"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Tooltip title="Carrito de compras">
              <IconButton
                onClick={() => navigate("/carrito")}
                sx={{ width: "50px", height: "50px" }}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Badge
                  badgeContent={1}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#84cc16",
                      color: "white",
                    },
                  }}
                >
                  <BsCart4 className="text-brand-black" />
                </Badge>
              </IconButton>
            </Tooltip>

            {usuario ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => navigate("/ingresar")}
                className="hover:bg-brand-main cursor-pointer bg-white text-brand-main font-semibold hover:text-white duration-200 rounded-md border-2 border-brand-main hidden md:block px-6 py-2"
              >
                Ingresar
              </button>
            )}
          </div>

          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <div className="flex cursor-pointer items-center justify-center rounded-3xl bg-white hover:bg-slate-200">
              <div className="space-y-2.5">
                <span
                  className={`block h-0.5 w-9 origin-center rounded-full bg-brand-black transition-transform duration-300 ease-in-out ${
                    open ? "translate-y-1 rotate-45" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-7 origin-center rounded-full bg-brand-main transition-transform duration-300 ease-in-out ${
                    open ? "-translate-y-2 -rotate-45 w-9" : ""
                  }`}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu open={open} setOpen={setOpen} usuario={usuario} />
    </>
  );
};

export default Navbar;
