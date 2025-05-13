import { saveUserCart, createCart } from "@src/api/cart/api";

export const guardarCarrito = async (userId, cartState) => {
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

export const crearCarrito = async (userId, cartState) => {
  if (!userId || !Array.isArray(cartState)) return;

  const products = cartState.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  const cartData = {
    id: userId,
    products: products,
  };

  try {
    await createCart(cartData); 
  } catch (error) {
    console.error("Error al crear carrito en BD", error);
  }
};