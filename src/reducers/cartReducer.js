export const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

// 1. eliminar carrito de db.json
// 2. almacenar carrito en session storage y al finalizar sesion o hacer logout agregar nuevo carrito a bd y limpiar cart de storage
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;

      const existingProduct = state.find(
        (p) => p.productId === product.productId
      );

      let newState;

      if (existingProduct) {
        newState = state.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      } else {
        newState = [...state, { ...product }];
      }

      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }

    case "REMOVE_FROM_CART": {
      const newState = state.filter((p) => p.productId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;

      const newState = state.map((p) => {
        if (p.productId === productId) {
          const maxStock = p.productData.stock || Infinity;
          const newQuantity = Math.min(quantity, maxStock);
          return { ...p, quantity: newQuantity };
        }
        return p;
      });

      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }

    case "CLEAR_CART": {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    }

    default:
      return state;
  }
};
