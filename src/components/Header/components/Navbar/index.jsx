import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Badge from "@mui/material/Badge";
import { NAVBAR_MENU } from "@src/global/store.js";
import MobileMenu from "./components/MobileMenu.jsx";
import UserMenu from "./components/User/UserMenu.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { CartContext } from "@src/contexts/CartContext.jsx";
import { useValidacion } from "@src/contexts/AuthContext.jsx";
import { useTheme } from "@src/contexts/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const auth = useValidacion();
  const { countProducts } = useContext(CartContext);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  if (!auth) return null;

  const { isAuthenticated, user } = auth;

  return (
    <>
      <nav className="bg-transparent transition-colors duration-300">
        <div className="w-full lg:px-30 flex justify-between items-center pt-10 md:pt-5">
          <div className="hidden md:block">
            <ul className="flex items-center gap-2 lg:gap-6 text-black dark:text-white">
              {NAVBAR_MENU.map((item) => {
                return (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      className="relative inline-block py-1 px-3 font-semibold 
             text-[color:var(--color-black)] 
             dark:text-[color:var(--color-white)] 
             hover:text-[color:var(--color-primary)] 
             transition-colors duration-300 
             before:content-[''] before:absolute before:left-0 before:-bottom-1 
             before:h-0.5 before:w-0 
             before:bg-[color:var(--color-primary)] 
             before:transition-all before:duration-300 
             hover:before:w-full"
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
                className="hover:bg-primary cursor-pointer bg-white dark:bg-primary dark:hover:bg-primary-hover text-primary dark:text-white font-semibold hover:text-white duration-200 rounded-md border-2 border-primary hidden md:block px-6 py-2"
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
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  <BsCart4 className="text-black dark:text-white" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip
              title={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
              arrow
            >
              <IconButton
                onClick={toggleTheme}
                sx={{ width: "50px", height: "50px" }}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {isDarkMode ? (
                  <BsMoon className="text-white w-5" />
                ) : (
                  <BsSun className="text-black w-5" />
                )}
              </IconButton>
            </Tooltip>
          </div>

          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <div className="flex cursor-pointer items-center justify-center rounded-3xl hover:bg-slate-200">
              <div className="space-y-2.5">
                <span
                  className={`block h-0.5 w-9 origin-center rounded-full bg-black dark:bg-white transition-transform duration-300 ease-in-out ${
                    open ? "translate-y-1 rotate-45" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-7 origin-center rounded-full bg-primary transition-transform duration-300 ease-in-out ${
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
