import { useReducer, createContext, useEffect } from "react";
import { cartReducer, cartInitialState } from "@src/reducers/cartReducer";
import { calcularTotal } from "@src/utils/calcularTotal";
//import { updateProductStock, fetchProductById } from "@src/api/products";
import { useValidacion } from "./AuthContext";


export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user,token } = useValidacion();

  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product, quantity = 1) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        quantity,
        productData: {
          productId: product.id,
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
      
      
      let userId = user.user.user_Id;
       const response = await fetch(`http://localhost:8080/carts/user/${userId}`, {
      
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token,   

        },

        
      });
      if (response.ok) {
            const data = await response.json();
            const products = data.products;
            for (const p of products) {
            
              addToCart(p, p.quantity);
            }
      } else if (response.status === 404) {
      // Manejar el caso en que NO haya carrito
      console.warn(`No hay carrito para el usuario ${userId}`);
     
    } else {
      console.error(`Error inesperado al obtener carrito. Código: ${response.status}`);
    }

    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

    const finalizePurchase = async () => {
      try {
        for (const { productId, quantity, productData } of cart) {
          // calcula nuevo stock
          

          const response = await fetch(`http://localhost:8080/products/update/${productId}/stock`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' +token, 
            },
            body: JSON.stringify({ stock: productData.stock - quantity }),
          });

          if (!response.ok) {
            console.error(`Error al actualizar stock para producto ${productId}`);
          }else{
            console.log(response)
          }

          // opcional, si quieres mantener la lógica
//await updateProductStock(productId, stockActualizado.stock);
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
