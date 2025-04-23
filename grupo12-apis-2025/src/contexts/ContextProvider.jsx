import { UsuarioProvider } from "./UserContext";
import { ValidacionProvider } from "./AuthContext";
import { CarritoProvider } from "./CartContext";
import { ProductosProvider } from "./ProductContext";

export function AppContextProvider({ children }) {
  return (
    <UsuarioProvider>
      <ValidacionProvider>
        <CarritoProvider>
          <ProductosProvider>{children}</ProductosProvider>
        </CarritoProvider>
      </ValidacionProvider>
    </UsuarioProvider>
  );
}
