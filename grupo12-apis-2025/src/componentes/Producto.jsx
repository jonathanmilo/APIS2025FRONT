function Producto({ producto }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col justify-between max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
          <div className="relative flex flex-col gap-2">
            <img
              src={producto.images[0]}
              alt="Product"
              className="w-full h-52 object-cover"
            />
            <div className="px-3">
              <h3 className="text-xl font-bold text-gray-900">
                {producto.nombre}
              </h3>
              <p className="text-gray-500 mt-1">{producto.descripcion}</p>
            </div>
          </div>

          <div className="flex justify-around flex-col p-3 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">
                  ${producto.precio}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <div className="text-yellow-400">★★★★</div>
                <div className="text-gray-300">★</div>
                <span className="text-sm text-gray-600 ml-1">(42)</span>
              </div>
            </div>

            <button className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 rounded-lg transition-colors">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Producto;
