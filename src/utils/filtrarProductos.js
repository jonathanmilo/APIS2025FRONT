import normalizarTexto from "./normalizarTexto";

export function filtrarPorNombre(productos, termino) {
  const texto = normalizarTexto(termino);
  return productos.filter((p) => normalizarTexto(p.title).includes(texto));
}

export function filtrarDestacados(productos) {
  return productos.filter((p) => p.isFeatured);
}

export function filtrarPorUsuario(productos, userId) {
  return productos.filter((p) => String(p.userId) == String(userId));
}

export function filtrarConDescuento(productos) {
  return productos.filter((p) => p.discountPercentage > 0);
}

export function filtrarRelacionados(productos, productoActual) {
  return productos.filter(
    (p) =>
      p.subcategoryIds.some((subId) =>
        productoActual.subcategoryIds.includes(subId)
      ) && p.id !== productoActual.id
  );
}

export function obtenerNombresSubcategorias(producto, categorias) {
  const subIds = producto.subcategoryIds;

  const todasSubcategorias = categorias.flatMap((c) => c.subcategories);

  const nombres = subIds
    .map((id) => {
      const sub = todasSubcategorias.find((s) => s.id === id);
      return sub ? sub.name : null;
    })
    .filter(Boolean);

  return nombres;
}

export function obtenerNombreCategoria(producto, categorias) {
  const categoria = categorias.find((cat) => cat.id === producto.categoryId);
  return categoria ? categoria.name : null;
}
