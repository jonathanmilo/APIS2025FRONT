import { useReducer, createContext, useEffect } from "react";
import { cartReducer, cartInitialState } from "@src/reducers/cartReducer";
import { calcularTotal } from "@src/utils/calcularTotal";
import { updateProductStock, fetchProductById } from "@src/api/products";
import { useValidacion } from "./AuthContext";
import { fetchUserCart } from "@src/api/cart/api";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useValidacion();
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product, quantity = 1) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        quantity,
        productData: {
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage || 0,
          images: product.images || [],
          stock: product.stock,
        },
      },
    });

  const removeFromCart = (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

  const updateQuantity = (productId, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const countProducts = () => cart.length;

  const obtenerCarrito = async () => {
    if (!user) return;
    try {
      const response = await fetchUserCart(user.id);
      const products = response.data.products;
      for (const p of products) {
        const res = await fetchProductById(p.productId);
        addToCart(res.data, p.quantity);
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  const finalizePurchase = async () => {
    try {
      for (const { productId, quantity, productData } of cart) {
        await updateProductStock(productId, productData.stock - quantity);
      }
      clearCart();
      return new Promise((resolve) => setTimeout(() => resolve(true), 500));
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      return false;
    }
  };

  useEffect(() => {
      if (user) {
        obtenerCarrito();
      }
    }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calcularTotal: () => calcularTotal(cart),
        countProducts,
        obtenerCarrito,
        finalizePurchase,
        loading: false,
        error: null,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
