import { Link } from "react-router-dom";

export default function Banner() {
  const image =
    "https://images.pexels.com/photos/5708232/pexels-photo-5708232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <section
      className="min-h-[12rem] xl:min-h-[20rem] bg-cover bg-center flex items-center bg-no-repeat justify-center md:justify-start cursor-default"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex flex-col items-center gap-3 text-center px-4 md:ms-10 relative z-10 bg-white/15 rounded-xl p-5">
        <p className="text-[#000000] font-paytone-one text-3xl sm:text-4xl uppercase tracking-wide">
        Nuestro Catalogo
        </p>
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="rounded-full text-sm bg-[#000000] py-2 px-4 w-40 text-white">
            Hasta <span className="font-bold">20%</span> OFF
          </p>
          <Link
            className="bg-primary px-8 py-1 rounded-full font-bold cursor-pointer hover:bg-primary-hover"
            to="/catalogo"
          >
            Ver
          </Link>
        </div>
        <p className="text-white text-sm">Válido hasta el 21/05/25.</p>
      </div>
    </section>
  );
}
