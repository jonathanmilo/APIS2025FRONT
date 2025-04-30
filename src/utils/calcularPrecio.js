export function calcularPrecio(price, discountPercentage) {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
}
