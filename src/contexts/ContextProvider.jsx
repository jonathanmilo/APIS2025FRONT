import { UsuarioProvider } from "./UserContext";
import { ValidacionProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ProductosProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";

export function AppContextProvider({ children }) {
  return (
    <UsuarioProvider>
      <ValidacionProvider>
        <CartProvider>
          <ProductosProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </ProductosProvider>
        </CartProvider>
      </ValidacionProvider>
    </UsuarioProvider>
  );
}
