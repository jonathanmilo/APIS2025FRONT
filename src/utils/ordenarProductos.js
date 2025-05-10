export function ordenarPorTitulo(productos, orden = "asc") {
  return [...productos].sort((a, b) => {
    return orden === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });
}

export function ordenarPorPrecio(productos, orden = "asc") {
  return [...productos].sort((a, b) => {
    return orden === "asc" ? a.price - b.price : b.price - a.price;
  });
}
