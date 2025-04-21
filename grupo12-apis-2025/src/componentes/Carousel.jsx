// src/componentes/Carousel.jsx
import React from "react"

export default function Carousel({ title, items }) {
  return (
    <section className="py-4">
      {title && (
        <h2 className="text-2xl font-bold px-4 mb-2 text-black">
          {title}
        </h2>
      )}
      <div className="overflow-x-auto scrollbar-hide px-4">
        <div className="flex space-x-4">
          {items.map(prod => (
            <div
              key={prod.id_producto}
              className="min-w-[200px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <img
                src={prod.images[0]}
                alt={prod.nombre}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-bold text-black">{prod.nombre}</h3>
                <p className="text-sm text-gray-500 truncate text-black">
                  {prod.descripcion}
                </p>
                <p className="mt-2 text-xl font-semibold text-black">
                  ${prod.precio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
