// src/secciones/ProductDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../componentes/Header'
import Carousel from '../componentes/Carousel'  // Importar el componente del carrusel

export function ProductDetail() {
  const { id } = useParams()  // Obtener el ID de la URL
  const [producto, setProducto] = useState(null)
  const [error, setError] = useState(null)
  const [cantidad, setCantidad] = useState(1) // Para el selector de cantidad
  const [productosRelacionados, setProductosRelacionados] = useState([]) // Productos de la misma sub-categoría

  useEffect(() => {
    // Cargar producto actual
    fetch("http://localhost:3001/productos")
      .then(res => res.json())
      .then(data => {
        const prod = data.find(p => String(p.id_producto) === id)
        if (prod) {
          setProducto(prod)

          // Filtrar productos de la misma sub-categoría
          const productosDeCategoria = data.filter(p => p["sub-categoria"] === prod["sub-categoria"] && p.id_producto !== prod.id_producto)
          setProductosRelacionados(productosDeCategoria)
        } else {
          setError('Producto no encontrado')
        }
      })
      .catch(err => setError(err.message))
  }, [id])

  // Manejadores de error y carga
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

  // Función para manejar el cambio de cantidad
  const manejarCantidad = (operacion) => {
    if (operacion === "incrementar") {
      setCantidad(cantidad + 1)
    } else if (operacion === "decrementar" && cantidad > 1) {
      setCantidad(cantidad - 1)
    }
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
            <h1 className="text-3xl font-bold mb-2 text-black">{producto.nombre}</h1>
            <p className="text-grey-600 mb-4 text-black">{producto.descripcion}</p>

            <div className="text-2xl font-semibold mb-4 text-black">${producto.precio}</div>

            {producto.descuento > 0 && (
              <p className="mb-4 text-green-600 text-black">
                Descuento: {producto.descuento}%
              </p>
            )}

            <p className="mb-6 text-black">
              Sub-categoría: <span className="font-medium">{producto["sub-categoria"]}</span>
            </p>

            <div className="flex items-center mb-4">
              <button
                onClick={() => manejarCantidad("decrementar")}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                -
              </button>
              <span className="mx-4 text-xl text-black">{cantidad}</span>
              <button
                onClick={() => manejarCantidad("incrementar")}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                +
              </button>
            </div>

            <button className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Agregar al carrito
            </button>
          </div>
        </div>

        {/* Carrusel de productos relacionados */}
        {productosRelacionados.length > 0 && (
          <section className="mt-6">
            <Carousel title="Productos de la misma sub-categoría" items={productosRelacionados} />
          </section>
        )}
      </div>
    </>
  )
}
