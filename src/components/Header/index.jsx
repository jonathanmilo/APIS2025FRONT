import SearchBarDropdown from "./components/SearchBarDropdown";
import Navbar from "./components/Navbar";
import { STORE_NAME } from "../../global/store";

const Header = () => {
  return (
    <>
      <header className="sticky w-full top-0 bg-white z-50 py-5 border-b-1 border-gray-200 px-10 lg:px-20">
        <div className="flex flex-row items-center justify-center md:justify-between gap-2 lg:gap-0">
          <div className="text-2xl flex items-center gap-1 font-bold">
            <img src="/icon.svg" alt="" className="h-12 md:h-8" />
            <p className="text-brand-main hidden md:block">{STORE_NAME}</p>
          </div>
          <SearchBarDropdown />
        </div>
        <Navbar />
      </header>
    </>
  );
};

export default Header;
