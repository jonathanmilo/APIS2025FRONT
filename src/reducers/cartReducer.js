export const cartInitialState = [];

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // Esperamos que el payload tenga productId, quantity y productData completo
      const { productId, quantity, productData } = action.payload;
      const existingProduct = state.find((p) => p.productId === productId);
      let newState;
      if (existingProduct) {
        // Si ya existe, actualizamos la cantidad y los datos del producto
        newState = state.map((p) =>
          p.productId === productId
            ? { ...p, quantity: p.quantity + quantity, productData: { ...p.productData, ...productData } }
            : p
        );
      } else {
        // Si no existe, agregamos el producto con toda la info necesaria
        newState = [
          ...state,
          {
            productId,
            quantity,
            productData: { ...productData },
          },
        ];
      }
      return newState;
    }
    case "REMOVE_FROM_CART": {
      return state.filter((p) => p.productId !== action.payload);
    }
    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      return state.map((p) => {
        if (p.productId === productId) {
          const maxStock = p.productData.stock || Infinity;
          const newQuantity = Math.min(quantity, maxStock);
          return { ...p, quantity: newQuantity };
        }
        return p;
      });
    }
    case "CLEAR_CART": {
      return [];
    }
    default:
      return state;
  }
};
