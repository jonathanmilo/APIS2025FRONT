import Footer from "@src/components/Footer";
import Header from "@src/components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
