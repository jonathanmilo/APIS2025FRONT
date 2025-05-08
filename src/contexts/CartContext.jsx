import { useReducer, createContext } from "react";
import { cartReducer, cartInitialState } from "@src/reducers/cartReducer";
import { calcularTotal } from "@src/utils/calcularTotal";
import { updateProductStock } from "@src/api/products";


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

  const countProducts = () => state.length;

  const finalizePurchase = () => {
    for (let i = 0; i < state.length; i++) {
      const product = state[i];
      const { productId, quantity } = product;
        try {

          const response = updateProductStock(productId, product.productData.stock - product.quantity);

          console.log("Stock actualizado", response.data);
          clearCart();
          } catch (error) {
          console.error("Error al actualizar el stock", error);
        }
    }
    return new Promise((resolve) => {
      setTimeout(() => {

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
        countProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
