// src/secciones/ProductDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../componentes/Header'

export function ProductDetail() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then(res => res.json())
      .then(data => {
        const prod = data.find(p => String(p.id_producto) === id)
        if (prod) {
          setProducto(prod)
        } else {
          setError('Producto no encontrado')
        }
      })
      .catch(err => setError(err.message))
  }, [id])

  if (error) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-red-500">{error}</div>
      </>
    )
  }

  if (!producto) {
    return (
      <>
        <Header />
        <div className="p-8 text-center">Cargando producto…</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <Link
          to="/products"
          className="inline-block mb-4 text-lime-500 hover:underline"
        >
          ← Volver a productos
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={producto.images[0]}
            alt={producto.nombre}
            className="w-full lg:w-1/2 h-80 object-cover rounded-lg shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
            <p className="text-gray-600 mb-4">{producto.descripcion}</p>

            <div className="text-2xl font-semibold mb-4">${producto.precio}</div>

            {producto.descuento > 0 && (
              <p className="mb-4 text-green-600">
                Descuento: {producto.descuento}%
              </p>
            )}

            <p className="mb-6">
              Sub-categoría: <span className="font-medium">{producto["sub-categoria"]}</span>
            </p>

            <button className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
