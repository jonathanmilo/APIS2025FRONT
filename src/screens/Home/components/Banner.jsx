export default function Banner() {
  const image =
    "https://images.pexels.com/photos/5708232/pexels-photo-5708232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <section
      className="min-h-[20rem] xl:min-h-[25rem] bg-cover bg-fixed bg-bottom xl:bg-center flex items-center justify-start cursor-default"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex flex-col items-center gap-5 text-center px-4 md:ms-10 relative z-10 ">
        <p className="text-[#000000] font-paytone-one text-4xl sm:text-5xl uppercase tracking-wide text-shadow-gray-300 text-shadow-2xs">
          Jueves de ofertas
        </p>
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
          <p className="rounded-full text-xl bg-[#000000] py-2 px-4 w-52 text-white">
            Hasta <span className="font-bold">20%</span> OFF
          </p>
          <button className="bg-primary text-lg px-8 py-2 rounded-full font-bold cursor-pointer hover:bg-primary-hover">
            Ver
          </button>
        </div>
        <p className="text-white text-sm">Válido hasta el 21/05/25.</p>
      </div>
    </section>
  );
}
