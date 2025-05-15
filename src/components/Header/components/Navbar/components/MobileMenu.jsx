import { NAVBAR_MENU } from "@src/global/store";
import { Link } from "react-router-dom";

const MobileMenu = ({ open, setOpen, usuario }) => {

  return (
    <div
      className={`fixed top-[180px] right-0 w-full h-[calc(100vh-80px)] bg-white dark:bg-[color:var(--color-gray)]  z-40 transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      } md:hidden shadow-lg`}
    >
      <ul className="flex flex-col items-center justify-start mt-15 h-full gap-8 text-xl font-semibold text-brand-black">
        {NAVBAR_MENU.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              onClick={() => setOpen(false)}
              className="text-black dark:text-white"
            >
              {item.title}
            </Link>
          </li>
        ))}

        {!usuario && (
          <li className="mt-40">
            <Link
              to="/ingresar"
              onClick={() => setOpen(false)}
              className="hover:bg-primary cursor-pointer bg-white dark:bg-primary dark:text-white text-primary font-semibold hover:text-white duration-200 rounded-md border-2 border-primary px-6 py-2"
            >
              Ingresar
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
