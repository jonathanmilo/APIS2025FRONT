import { ValidacionProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ProductosProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";

export function AppContextProvider({ children }) {
  return (
    
      <ValidacionProvider>
        
        <CartProvider>
          <ProductosProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </ProductosProvider>
        </CartProvider>
        
      </ValidacionProvider>

  );
}
