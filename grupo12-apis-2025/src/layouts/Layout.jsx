import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children, buscar }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar buscar={buscar} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
