import normalizarTexto from "./normalizarTexto";

export function filtrarPorNombre(productos, termino) {
  const texto = normalizarTexto(termino);
  return productos.filter((p) => normalizarTexto(p.nombre).includes(texto));
}

export function filtrarDestacados(productos) {
  return productos.filter((p) => p.destacado);
}

export function filtrarConDescuento(productos) {
  return productos.filter((p) => p.descuento > 0);
}

export function filtrarRelacionados(productos, productoActual) {
  return productos.filter(
    (p) =>
      p["sub-categoria"] === productoActual["sub-categoria"] &&
      p.id_producto !== productoActual.id_producto
  );
}
