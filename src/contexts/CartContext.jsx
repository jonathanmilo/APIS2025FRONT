import { useReducer, createContext } from "react";
import { cartReducer, cartInitialState } from "../reducers/cartReducer";
import { calcularTotal } from "../utils/calcularTotal";

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

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

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const updateQuantity = (productId, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });

  return {
    state,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };
}

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart, updateQuantity } =
    useCartReducer();

  const finalizePurchase = () => {
    //agregar logica para actualizar stock del producto
    return new Promise((resolve) => {
      setTimeout(() => {
        clearCart();
        resolve(true);
      }, 500);
    });
  };

  //agregar logica obtener carrito de la base de datos
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        calcularTotal: () => calcularTotal(state),
        finalizePurchase,
        loading: false,
        error: null,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
