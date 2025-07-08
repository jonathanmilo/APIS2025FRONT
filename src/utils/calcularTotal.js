export function calcularTotal(carrito) {
  return carrito.reduce((acc, item) => {
    const price = item.price || 0;
    const discount = item.discountPercentage || 0;
    const finalPrice = price * (1 - discount / 100);
    return acc + finalPrice * item.quantity;
  }, 0);
}
