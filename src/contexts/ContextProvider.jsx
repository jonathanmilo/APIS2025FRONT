import { UsuarioProvider } from "./UserContext";
import { ValidacionProvider } from "./AuthContext";
import { CarritoProvider } from "./CartContext";
import { ProductosProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";

export function AppContextProvider({ children }) {
  return (
    <UsuarioProvider>
      <ValidacionProvider>
        <CarritoProvider>
          <ProductosProvider>
              <CategoryProvider>{children}</CategoryProvider>
          </ProductosProvider>
        </CarritoProvider>
      </ValidacionProvider>
    </UsuarioProvider>
  );
}
