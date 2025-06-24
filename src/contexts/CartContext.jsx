import { useReducer, createContext, useEffect } from "react";
import { cartReducer, cartInitialState } from "@src/reducers/cartReducer";
import { calcularTotal } from "@src/utils/calcularTotal";
import { updateProductStock, fetchProductById } from "@src/api/products";
import { useValidacion } from "./AuthContext";
import { fetchUserCart, createCart, updateProductQuantityInCart } from "@src/api/cart/api";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useValidacion();
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);

  // Sincronizar el carrito con el backend
  const syncCartWithBackend = async (newCart) => {
    if (!user) return;
    const products = newCart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    try {
      await updateProductQuantityInCart(user.id, products);
    } catch (error) {
      console.error("Error sincronizando carrito con backend:", error);
    }
  };

  const addToCart = (product, quantity = 1) => {
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
    // Sincronizar con backend después de actualizar el estado
    const newCart = cartReducer(cart, {
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
    syncCartWithBackend(newCart);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    const newCart = cartReducer(cart, { type: "REMOVE_FROM_CART", payload: productId });
    syncCartWithBackend(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
    const newCart = cartReducer(cart, { type: "UPDATE_QUANTITY", payload: { productId, quantity } });
    syncCartWithBackend(newCart);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    syncCartWithBackend([]);
  };

  const countProducts = () => cart.length;

  const obtenerCarrito = async () => {
    if (!user) return;
    try {
      const response = await fetchUserCart(user.id);
      const products = response.data.products;
      for (const p of products) {
        const res = await fetchProductById(p.productId);
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            productId: res.data.id,
            quantity: p.quantity,
            productData: {
              title: res.data.title,
              price: res.data.price,
              discountPercentage: res.data.discountPercentage || 0,
              images: res.data.images || [],
              stock: res.data.stock,
            },
          },
        });
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
