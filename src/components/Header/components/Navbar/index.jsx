import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Badge from "@mui/material/Badge";
import { NAVBAR_MENU } from "../../../../global/store.js";
import MobileMenu from "./components/MobileMenu.jsx";
import UserMenu from "./components/User/UserMenu.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { CartContext } from "../../../../contexts/CartContext.jsx";
import { useValidacion } from "../../../../contexts/AuthContext.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const auth = useValidacion();
  const { countProducts } = useContext(CartContext);
  const navigate = useNavigate();

  if (!auth) return null;

  const { isAuthenticated, user } = auth;

  return (
    <>
      <nav className="sticky top-0 bg-white">
        <div className="w-full lg:px-30 flex justify-between items-center pt-10 md:pt-5">
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

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <UserMenu usuario={user} />
            ) : (
              <button
                onClick={() => navigate("/ingresar")}
                className="hover:bg-brand-main cursor-pointer bg-white text-brand-main font-semibold hover:text-white duration-200 rounded-md border-2 border-brand-main hidden md:block px-6 py-2"
              >
                Ingresar
              </button>
            )}
            <Tooltip title="Carrito de compras" arrow>
              <IconButton
                onClick={() => navigate("/carrito")}
                sx={{ width: "50px", height: "50px" }}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Badge
                  badgeContent={countProducts()}
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

      <MobileMenu open={open} setOpen={setOpen} usuario={user} />
    </>
  );
};

export default Navbar;
