import { saveUserCart } from "@src/api/cart/api";

export const guardarCarritoEnBD = async (userId, cartState) => {
  if (!userId) return;

  const products = cartState.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  try {
    await saveUserCart(userId, products); 
  } catch (error) {
    console.error("Error al guardar el carrito en BD", error);
  }
};